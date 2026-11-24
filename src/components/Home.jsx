import React from 'react';
import { Link } from 'react-router-dom';

const previewColumns = [
  ['H', 'H'],
  ['T', 'T', 'T'],
  ['H'],
  ['T', 'T'],
];

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero Section */}
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            Interactive Streak Visualizer
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Track <span className="text-amber-600">Head</span> &amp;{' '}
            <span className="text-indigo-600">Tail</span> streaks with clarity.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Submit coin outcomes manually or flip randomly. Matching consecutive
            values stack vertically in the same column, while a change starts a
            brand-new column to the right.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/head-tail"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Open Head &amp; Tail
            </Link>
            <Link
              to="/about"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Visual Preview Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Example Sequence: H, H, T, T, T, H, T, T
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              4 Columns
            </span>
          </div>

          <div className="flex items-start justify-center gap-4 py-4">
            {previewColumns.map((col, colIdx) => {
              const isHead = col[0] === 'H';
              return (
                <div
                  key={colIdx}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-2.5 ${
                    isHead
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-indigo-200 bg-indigo-50/50'
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                      isHead
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    &times;{col.length}
                  </span>
                  {col.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-xs ring-2 ring-white ${
                        item === 'H'
                          ? 'bg-gradient-to-br from-amber-400 to-amber-500'
                          : 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <h2 className="text-base font-bold text-slate-900">
            Streak-Based Columns
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Consecutive identical flips stack in the active column; switching
            between H and T automatically opens the next column.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <h2 className="text-base font-bold text-slate-900">
            Live Analytics
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Monitor total flips, Head/Tail percentages, current streak, and
            longest runs in real time.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <h2 className="text-base font-bold text-slate-900">
            Undo &amp; Persistence
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Step back with Undo, test quickly with Flip Coin, and keep your
            progress saved in local storage.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
