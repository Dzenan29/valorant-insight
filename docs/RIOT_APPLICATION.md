# VALORANT Insight: Riot production application readiness

Public prototype: https://valorant-insight-bice.vercel.app

## Honest current state
- Public demo using synthetic fixtures; no account login, no Riot API access, no data persistence.
- Interactive simulated opt-in journey at /connect, not a real RSO authorization.
- Draft Privacy and Terms at /privacy and /terms; these MUST be reviewed and populated with operator identity, contact, actual hosting processing and legal basis before production collection of personal information.
- /riot.txt endpoint intentionally returns 404 until Riot supplies a token.

## Target use case
Publicly available, player-opt-in retrospective historical competitive-match analytics and playtime coaching. Queue Forecast compares past win-rate and RR patterns; no guarantees or real-time tactical guidance, pre-game scouting, gambling, or third-party profile lookup.

## Before submission
1. Review operator legal identity and contact details; finalize privacy and terms with qualified legal review if needed.
2. Verify the exact public URL and Riot Developer Portal requirements for domain ownership. Vercel subdomain verification is NOT guaranteed.
3. Submit the truthful production application through the Riot Developer Portal. Riot supplies a verification string after submission.
4. Add RIOT_VERIFICATION_TOKEN to Vercel production environment (encrypted); deploy and inspect https://<your-verified-domain>/riot.txt to ensure token exact-match, then run Riot's website verification.
5. Do not activate RSO or real-player data retrieval without Riot production and RSO approval.
6. Define data retention, deletion, user opt-in and technical security before live player access.

## Suggested product description
Valorant Insight is an independent, public-facing opt-in player coaching and historical analytics web application. It offers comparative analysis of past competitive matches, including agents, maps, RR trends, session length, local playtime windows and carefully qualified pre-queue timing insights. This linked prototype demonstrates the intended dashboard and player data-consent journey with explicitly synthetic fixtures. No live Riot API integration is currently enabled. Following Riot production approval, Riot Sign On will be used for authorization, followed by private-by-default analysis of each consenting player's own match history.

## Riot documentation
- https://developer.riotgames.com/docs/valorant
- https://developer.riotgames.com/how-to-verify-site.html
- https://support-developer.riotgames.com/hc/en-us/articles/22801383038867-Production-Key-Applications
