# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Discord bot that monitors voice channel activity (specifically "PewPew" and "Watercooler" channels) and sends join/leave notifications to Slack via webhooks. Deployed on Heroku as a worker process.

## Commands

- `npm start` — Run the bot (`node index.js`)
- Node 16 (see `.nvmrc`)
- No tests or linter configured

## Architecture

Single-file bot (`index.js`) using discord.js v13. Listens for `voiceStateUpdate` events and posts to Slack webhooks. `usernameMapping.js` maps Discord usernames to friendly display names.

## Environment Variables

Configured via `.env` (gitignored): `GC_BOT_TOKEN`, `GC_COFFEE_WEBHOOK_URL`, `GC_GAMES_WEBHOOK_URL`.

## Code Style

Prettier config: 2-space tabs, single quotes, no semicolons, trailing commas, no bracket spacing.
