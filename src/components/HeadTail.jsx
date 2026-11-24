import React, { useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'head-tail-history';

/**
 * Groups consecutive identical values into vertical columns.
 * Example: ['H', 'H', 'T', 'T', 'T', 'H'] -> [['H', 'H'], ['T', 'T', 'T'], ['H']]
 */
function groupIntoColumns(sequence) {
  if (sequence.length === 0) return [];

  const columns = [];
  for (const value of sequence) {
    const lastColumn = columns[columns.length - 1];
    if (lastColumn && lastColumn[0] === value) {
      lastColumn.push(value);
    } else {
      columns.push([value]);
    }
  }
  return columns;
}

/**
 * Computes summary statistics from the flip history and grouped columns.
 */
function computeStats(history, columns) {
  const total = history.length;
  let headsCount = 0;
  let tailsCount = 0;

  for (const item of history) {
    if (item === 'H') headsCount += 1;
    else tailsCount += 1;
  }

  let longestH = 0;
  let longestT = 0;
  for (const col of columns) {
    if (col[0] === 'H' && col.length > longestH) longestH = col.length;
    if (col[0] === 'T' && col.length > longestT) longestT = col.length;
  }

  const lastColumn = columns[columns.length - 1];
  const currentStreak = lastColumn
    ? { value: lastColumn[0], count: lastColumn.length }
    : null;

  return {
    total,
    headsCount,
    tailsCount,
    headsPct: total ? Math.round((headsCount / total) * 100) : 0,
    tailsPct: total ? Math.round((tailsCount / total) * 100) : 0,
    longestH,
    longestT,
    currentStreak,
  };
}

function loadInitialHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item === 'H' || item === 'T');
  } catch {
    return [];
  }
}

function HeadTail() {
  const [selectedValue, setSelectedValue] = useState('');
  const [history, setHistory] = useState(loadInitialHistory);
  const [error, setError] = useState('');
  const boardRef = useRef(null);

  const columns = useMemo(() => groupIntoColumns(history), [history]);
  const stats = useMemo(() => computeStats(history, columns), [history, columns]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore storage quota errors
    }
  }, [history]);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.scrollTo({
        left: boardRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [columns.length]);

  const appendValue = (value) => {
    setHistory((prev) => [...prev, value]);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedValue) {
      setError('Please select a value from the dropdown.');
      return;
    }
    appendValue(selectedValue);
    setSelectedValue('');
  };

  const handleRandomFlip = () => {
    const outcome = Math.random() < 0.5 ? 'H' : 'T';
    appendValue(outcome);
  };

  const handleUndo = () => {
    setHistory((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleReset = () => {
    setHistory([]);
    setSelectedValue('');
    setError('');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Head &amp; Tail Board
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Consecutive identical values stack vertically. Switching between{' '}
            <span className="font-semibold text-amber-600">H</span> and{' '}
            <span className="font-semibold text-indigo-600">T</span> starts a new column.
          </p>
        </div>

        {stats.currentStreak && (
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
            <span className="text-slate-500">Current Streak:</span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                stats.currentStreak.value === 'H'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}
            >
              {stats.currentStreak.value} &times; {stats.currentStreak.count}
            </span>
          </div>
        )}
      </div>

      {/* Controls Card */}
      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="ht-select" className="sr-only">
              Select Head or Tail
            </label>
            <select
              id="ht-select"
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
                if (error) setError('');
              }}
              aria-invalid={Boolean(error)}
              className={`h-10 rounded-xl border bg-slate-50 px-3.5 text-sm font-medium text-slate-800 transition focus:bg-white focus:outline-none focus:ring-2 sm:w-48 ${
                error
                  ? 'border-rose-400 focus:ring-rose-500/30'
                  : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20'
              }`}
            >
              <option value="">Select value</option>
              <option value="H">H (Head)</option>
              <option value="T">T (Tail)</option>
            </select>

            <button
              type="submit"
              className="h-10 cursor-pointer rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Submit
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleRandomFlip}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 active:scale-[0.98]"
            >
              <span>Flip Coin</span>
            </button>

            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="h-10 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Undo
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={history.length === 0}
              className="h-10 cursor-pointer rounded-xl border border-rose-200 bg-rose-50/70 px-4 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Reset
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-2.5 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}
      </section>

      {/* Stats Grid */}
      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Total Flips
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {columns.length} {columns.length === 1 ? 'streak' : 'streaks'}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
            Heads (H)
          </p>
          <p className="mt-1 text-2xl font-bold text-amber-900">
            {stats.headsCount}{' '}
            <span className="text-sm font-semibold text-amber-700">
              ({stats.headsPct}%)
            </span>
          </p>
          <p className="mt-0.5 text-xs text-amber-700/80">
            Best streak: {stats.longestH}
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-4 shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-700">
            Tails (T)
          </p>
          <p className="mt-1 text-2xl font-bold text-indigo-900">
            {stats.tailsCount}{' '}
            <span className="text-sm font-semibold text-indigo-700">
              ({stats.tailsPct}%)
            </span>
          </p>
          <p className="mt-0.5 text-xs text-indigo-700/80">
            Best streak: {stats.longestT}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Distribution
          </p>
          <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            {stats.total > 0 ? (
              <>
                <div
                  className="bg-amber-400 transition-all duration-300"
                  style={{ width: `${stats.headsPct}%` }}
                  title={`Heads: ${stats.headsPct}%`}
                />
                <div
                  className="bg-indigo-500 transition-all duration-300"
                  style={{ width: `${stats.tailsPct}%` }}
                  title={`Tails: ${stats.tailsPct}%`}
                />
              </>
            ) : (
              <div className="w-full bg-slate-200" />
            )}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {stats.total > 0
              ? `${stats.headsPct}% H / ${stats.tailsPct}% T`
              : 'No data yet'}
          </p>
        </div>
      </section>

      {/* Streak Columns Board */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600">
            Streak Columns
          </h2>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              Head (H)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              Tail (T)
            </span>
          </div>
        </div>

        {columns.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-6 py-14 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200/70 text-lg font-bold text-slate-500">
              H/T
            </div>
            <p className="text-sm font-semibold text-slate-700">
              No flips recorded yet
            </p>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Choose <span className="font-semibold">H</span> or{' '}
              <span className="font-semibold">T</span> from the dropdown and click{' '}
              <span className="font-semibold">Submit</span>, or use{' '}
              <span className="font-semibold">Flip Coin</span> to start building streaks.
            </p>
          </div>
        ) : (
          <div
            ref={boardRef}
            className="flex items-start gap-3 overflow-x-auto pb-3 pt-1"
          >
            {columns.map((col, colIdx) => {
              const isHead = col[0] === 'H';
              return (
                <div
                  key={colIdx}
                  className={`flex min-w-[3.75rem] shrink-0 flex-col items-center rounded-xl border p-2 ${
                    isHead
                      ? 'border-amber-200/90 bg-amber-50/50'
                      : 'border-indigo-200/90 bg-indigo-50/50'
                  }`}
                >
                  <span
                    className={`mb-2 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
                      isHead
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    #{colIdx + 1} &middot; &times;{col.length}
                  </span>

                  <div className="flex flex-col gap-2">
                    {col.map((item, rowIdx) => (
                      <div
                        key={`${colIdx}-${rowIdx}`}
                        className={`animate-pop-in flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-xs ring-2 ring-white ${
                          item === 'H'
                            ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white'
                            : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
                        }`}
                        title={`Column ${colIdx + 1}, Item ${rowIdx + 1}: ${
                          item === 'H' ? 'Head' : 'Tail'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sequence History Strip */}
        {history.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="mb-2 text-xs font-medium text-slate-500">
              Sequence ({history.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {history.map((val, idx) => (
                <span
                  key={idx}
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                    val === 'H'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default HeadTail;
