import type { StaticImageData } from "next/image";
import activityMonitorIcon from "@/public/applications/activity-monitor.png";
import appStoreIcon from "@/public/applications/app-store.png";
import booksIcon from "@/public/applications/books.png";
import calculatorIcon from "@/public/applications/calculator.png";
import calendarIcon from "@/public/applications/calendar.png";
import clockIcon from "@/public/applications/clock.png";
import contactsIcon from "@/public/applications/contacts.png";
import diskUtilityIcon from "@/public/applications/disk-utility.png";
import facetimeIcon from "@/public/applications/facetime.png";
import finderIcon from "@/public/applications/finder.png";
import fontBookIcon from "@/public/applications/font-book.png";
import freeformIcon from "@/public/applications/freeform.png";
import homeIcon from "@/public/applications/home.png";
import journalIcon from "@/public/applications/journal.png";
import keynoteIcon from "@/public/applications/keynote.png";
import mailIcon from "@/public/applications/mail.png";
import mapsIcon from "@/public/applications/maps.png";
import messagesIcon from "@/public/applications/messages.png";
import musicIcon from "@/public/applications/music.png";
import newsIcon from "@/public/applications/news.png";
import notesIcon from "@/public/applications/notes.png";
import numbersIcon from "@/public/applications/numbers.png";
import pagesIcon from "@/public/applications/pages.png";
import passwordsIcon from "@/public/applications/passwords.png";
import photoBoothIcon from "@/public/applications/photo-booth.png";
import photosIcon from "@/public/applications/photos.png";
import podcastsIcon from "@/public/applications/podcasts.png";
import previewIcon from "@/public/applications/preview.png";
import quicktimePlayerIcon from "@/public/applications/quicktime-player.png";
import remindersIcon from "@/public/applications/reminders.png";
import safariIcon from "@/public/applications/safari.png";
import screenshotIcon from "@/public/applications/screenshot.png";
import shortcutsIcon from "@/public/applications/shortcuts.png";
import stocksIcon from "@/public/applications/stocks.png";
import systemSettingsIcon from "@/public/applications/system-settings.png";
import terminalIcon from "@/public/applications/terminal.png";
import texteditIcon from "@/public/applications/textedit.png";
import timeMachineIcon from "@/public/applications/time-machine.png";
import tvIcon from "@/public/applications/tv.png";
import voiceMemosIcon from "@/public/applications/voice-memos.png";
import weatherIcon from "@/public/applications/weather.png";
import xcodeIcon from "@/public/applications/xcode.png";

export type ApplicationIcon =
  | { kind: "image"; image: StaticImageData }
  | { kind: "beacon" };

export type Application = {
  id: string;
  name: string;
  icon: ApplicationIcon;
};

// Static imports produce content-hashed URLs with immutable caching. Replacing
// an asset changes its URL automatically, so browsers never retain an old icon.
const INDEX: [name: string, image: StaticImageData | null][] = [
  ["Activity Monitor", activityMonitorIcon],
  ["App Store", appStoreIcon],
  ["Beacon", null],
  ["Books", booksIcon],
  ["Calculator", calculatorIcon],
  ["Calendar", calendarIcon],
  ["Clock", clockIcon],
  ["Contacts", contactsIcon],
  ["Disk Utility", diskUtilityIcon],
  ["FaceTime", facetimeIcon],
  ["Finder", finderIcon],
  ["Font Book", fontBookIcon],
  ["Freeform", freeformIcon],
  ["Home", homeIcon],
  ["Journal", journalIcon],
  ["Keynote", keynoteIcon],
  ["Mail", mailIcon],
  ["Maps", mapsIcon],
  ["Messages", messagesIcon],
  ["Music", musicIcon],
  ["News", newsIcon],
  ["Notes", notesIcon],
  ["Numbers", numbersIcon],
  ["Pages", pagesIcon],
  ["Passwords", passwordsIcon],
  ["Photo Booth", photoBoothIcon],
  ["Photos", photosIcon],
  ["Podcasts", podcastsIcon],
  ["Preview", previewIcon],
  ["QuickTime Player", quicktimePlayerIcon],
  ["Reminders", remindersIcon],
  ["Safari", safariIcon],
  ["Screenshot", screenshotIcon],
  ["Shortcuts", shortcutsIcon],
  ["Stocks", stocksIcon],
  ["System Settings", systemSettingsIcon],
  ["Terminal", terminalIcon],
  ["TextEdit", texteditIcon],
  ["Time Machine", timeMachineIcon],
  ["TV", tvIcon],
  ["Voice Memos", voiceMemosIcon],
  ["Weather", weatherIcon],
  ["Xcode", xcodeIcon],
];

export const APPLICATIONS: Application[] = INDEX.map(([name, image]) => ({
  id: "app:" + name,
  name,
  icon: image ? { kind: "image", image } : { kind: "beacon" }
}));

export function applicationNamed(name: string): Application {
  const application = APPLICATIONS.find((app) => app.name === name);
  if (!application) throw new Error(`No demo application named ${name}`);
  return application;
}
