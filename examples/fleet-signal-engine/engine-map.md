# Engine map

Fictional example. No real companies or people.

```mermaid
flowchart TD
  sources[Sources] --> merge[Merge on domain]
  merge --> fit[Company fit]
  fit --> signals[Signal points]
  signals --> tiers[Tiers A B C]
  tiers --> buyers[Buyers at A and B]
  buyers --> email[Verified email]
  email --> draft[One draft]
  draft --> ready[Ready check]
  ready --> yes[Wait for a yes]
```

## Coverage path and signal path

The coverage path gives every company that passed fit a slow touch inside the weekly cap. The signal path moves a fresh strong signal up the rank. A company that failed fit stays held even when the signal is strong. Tier C does not buy a contact. Both paths use the same ready check, and neither path sends by itself.
