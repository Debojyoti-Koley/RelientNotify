# 🚀 ReliantNotify
## Distributed Notification Processing System

ReliantNotify is a scalable, priority-based notification processing system built using **Node.js, Redis, BullMQ, MongoDB, and TypeScript**.

It decouples API request handling from background job execution to ensure reliable, fault-tolerant, and scalable message delivery.

---

## ❗ Real-World Problems It Solves

Modern applications need to send:

- OTPs
- Alerts
- Transactional messages
- Bulk notifications

If notifications are sent directly inside the API request:

- API becomes slow or blocks when provider is delayed
- Failed messages are lost (no retry mechanism)
- Duplicate notifications occur due to client retries
- Critical messages (OTP) get delayed by bulk traffic
- System does not scale under high load

---

## 🚀 Solution

ReliantNotify solves these problems using a distributed, queue-based architecture:

- API stores notification in MongoDB and immediately returns `202 Accepted`
- Jobs are pushed to Redis and processed asynchronously using BullMQ workers
- Priority-based queues ensure OTPs are processed before bulk messages
- Automatic retries with exponential backoff handle temporary failures
- Dead Letter Queue (DLQ) tracks permanently failed jobs
- Idempotency keys prevent duplicate execution

This makes the system **scalable, reliable, and production-ready**.

---

## 📌 Features

- ✅ Priority-based Queues (High / Medium / Low)
- ✅ Asynchronous Job Processing using BullMQ
- ✅ Exponential Retry with Backoff Strategy
- ✅ Dead Letter Queue (DLQ) for failed jobs
- ✅ Idempotent REST APIs (No duplicate processing)
- ✅ MongoDB-based notification lifecycle tracking
- ✅ Dockerized Redis setup
- ✅ Scalable Worker Architecture with configurable concurrency

---

## 🏗 Architecture Overview

flowchart TD

    A[Client Request] --> B[Express API]
    B --> B1[Validate request]
    B --> B2[Idempotency check]
    B --> B3[Store notification in MongoDB]
    B --> B4[Push job to Redis Queue]

    B4 --> C["Redis (BullMQ Queue)"]
    C --> D[Worker Service]

    D --> D1[Fetch job]
    D --> D2[Process notification]
    D --> D3[Retry if failure]
    D --> D4[Move to DLQ after max attempts]
    D --> D5[Update MongoDB status]
---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express
- **Queue System:** BullMQ
- **Message Broker:** Redis
- **Database:** MongoDB
- **Containerization:** Docker
- **Language:** TypeScript

---

## 🔥 Priority-Based Queues

Notifications are routed to different queues based on priority:

- **High** → Real-time OTP / critical alerts
- **Medium** → Transactional messages
- **Low** → Bulk / promotional messages

Each queue has configurable concurrency to prevent resource starvation.

---

