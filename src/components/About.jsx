import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          About Head &amp; Tail
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Head &amp; Tail is a streak-tracking application built with React,
          React Router, and Tailwind CSS. Instead of separating Heads and Tails
          into two static buckets, it groups outcomes by consecutive runs.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Column Grouping Rules
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold text-slate-900">1. First entry:</span>{' '}
              Starts Column #1 with either{' '}
              <span className="font-semibold text-amber-700">H</span> or{' '}
              <span className="font-semibold text-indigo-700">T</span>.
            </li>
            <li>
              <span className="font-semibold text-slate-900">2. Same as previous:</span>{' '}
              Appends vertically to the current column, extending the streak.
            </li>
            <li>
              <span className="font-semibold text-slate-900">3. Different from previous:</span>{' '}
              Creates a new column immediately to the right.
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              React 19
            </span>
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              React Router 7
            </span>
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Tailwind CSS 4
            </span>
          </div>

          <Link
            to="/head-tail"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
