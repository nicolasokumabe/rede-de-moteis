import http from 'k6/http'
import { sleep, check } from 'k6'

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  }
}

export const options = {
  vus: 100,
  duration: '30s',
}

export default function () {
  const url = 'https://1fee00c9-3cf5-4aaa-ad0b-7fc826712782.mock.pstmn.io/motel/bookings'

  const params = {
    headers: {
      'X-API-Key': 'coloque a xapikey (o github nao me dexa subir)',
      'Content-Type': 'application/json',
    },
  }

  const res = http.get(url, params)

  check(res, {
    'status should be 200': (r) => r.status === 200,
  })

  sleep(1)
}
