-- How an event is attended: offline (in person), online, or hybrid (both).
-- `format` already exists but means something else (Личное/Командное = solo vs
-- team), so this is a separate column. Public catalog gets a "Формат" filter and
-- an "Онлайн" preset off it; the card meta-row shows online/hybrid.

-- events: required, defaults to offline (the common case — an address is enough).
alter table events add column if not exists attendance_mode text not null default 'offline';

alter table events drop constraint if exists events_attendance_mode_check;
alter table events add constraint events_attendance_mode_check
  check (attendance_mode in ('offline', 'online', 'hybrid'));

-- submissions: optional (public form may leave it blank; admin sets it on publish).
alter table submissions add column if not exists attendance_mode text;

alter table submissions drop constraint if exists submissions_attendance_mode_check;
alter table submissions add constraint submissions_attendance_mode_check
  check (attendance_mode is null or attendance_mode in ('offline', 'online', 'hybrid'));

-- Backfill existing events from the free-text `place` field (audit 2026-09-10:
-- 33 rows → 1 hybrid, 6 online, rest offline). Order matters: hybrid first, since
-- "онлайн и офлайн" also matches the online pattern.
update events set attendance_mode = 'hybrid'
where attendance_mode = 'offline'
  and place ~* '(онлайн.{0,10}офлайн|офлайн.{0,10}онлайн|гибрид|hybrid|онлайн.{0,4}очно|очно.{0,4}онлайн)';

update events set attendance_mode = 'online'
where attendance_mode = 'offline'
  and place ~* '(онлайн|online|дистанц|zoom|удал[ёе]нн)';
