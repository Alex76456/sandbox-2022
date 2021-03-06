import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

import React from "react"

import ReactDOM from "react-dom"
import "reflect-metadata"

import "@services/mobx-persist-configure"

import { reportWebVitals } from "@utils/report-web-vitals"

import { App } from "./App"

Sentry.init({
  integrations: [new BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

ReactDOM.render(<App />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
