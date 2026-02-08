# AGENTS.md

## Purpose
This repository powers a real-time penny-auction platform.  
When making changes, prioritize **auction correctness first**, then performance and UX.

## Project Map
- Backend API and realtime: `server/routes.ts`, `server/socket.ts`
- Auction logic: `server/services/auction-service.ts`
- Timer logic: `server/services/timer-service.ts`
- Bot logic: `server/services/bot-service.ts`
- Data access: `server/storage.ts`
- DB schema: `shared/schema.ts`
- Client auction views:
  - `client/src/pages/home.tsx`
  - `client/src/pages/auctions.tsx`
  - `client/src/pages/auction-detail.tsx`

## Non-Negotiable Invariants
1. One accepted bid must:
- consume exactly 1 user credit,
- increase price exactly once,
- reset timer exactly once.

2. Auction state transitions must be safe:
- `upcoming -> live -> finished` only,
- start/end must be idempotent.

3. Prebids must not be double-counted:
- conversion to live bids must be one-time,
- historical views must not merge already-consumed prebids.

4. Realtime events must be scoped:
- auction updates to auction room or required global channels only,
- user balance updates only to that user channel.

## Scalability Rules
- Avoid per-auction/per-user N+1 queries on hot endpoints.
- Prefer SQL joins/aggregations over loops with DB calls.
- Do not add new 1-second polling paths if socket updates can handle it.
- Keep payloads minimal; avoid broadcasting full live-auction snapshots to everyone each second.
- Any timer/lock logic intended for production scale must not rely on in-process memory only.

## DB and Transaction Rules
- Bid placement and prebid placement must use DB transactions.
- Use row-level locking or atomic conditional updates to prevent race conditions.
- Add indexes for hot filters/sorts before shipping new high-traffic queries.
- Enforce uniqueness constraints in DB where business rules require uniqueness (not only app code checks).

## Review Checklist Before Merge
- Auction correctness under concurrent requests considered.
- Multi-instance behavior considered (not just single process).
- Query count and index usage reviewed for changed endpoints.
- Realtime event fanout and payload size reviewed.
- Client/server contract unchanged or versioned explicitly.

## Local Verification (minimum)
1. Start app and place simultaneous bids from 2+ clients.
2. Verify no negative balances and no duplicate price steps.
3. Verify start/end behavior after server restart.
4. Verify timer and bid history consistency in detail page.
5. Verify websocket updates still work for home + auctions + detail pages.
