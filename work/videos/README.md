# Video hosting — don't commit videos to git

GitHub isn't built for video. Even past the 100MB-per-file limit, every
version of every video stays in the repo's history forever — six reels
today becomes a multi-GB repo after a few rounds of edits. The fix: host
the videos elsewhere, and just point the `<video src="...">` at that URL.
Nothing else about the code changes.

## Recommended: Cloudinary (free tier, easiest)

1. Sign up at cloudinary.com (free tier: 25GB storage, 25GB bandwidth/month
   — plenty for 6 short reels).
2. In the dashboard, Media Library → upload each `.mp4`.
3. Click a video → copy its "Secure URL" — looks like:
   `https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/reel-01.mp4`
4. In `project-armazem.html`, replace the local path with that URL:
   ```html
   <!-- before -->
   <source src="videos/reel-01.mp4" type="video/mp4">
   <!-- after -->
   <source src="https://res.cloudinary.com/your-cloud-name/video/upload/reel-01.mp4" type="video/mp4">
   ```
5. Same idea for poster images — either upload them to Cloudinary too, or
   let Cloudinary auto-generate one from the video
   (append `.jpg` to the video URL and it returns a frame as an image).

Other solid options if you outgrow the free tier: Bunny Stream (very cheap,
pay-as-you-go), Cloudflare R2 (cheap storage, no bandwidth fees).
YouTube (unlisted) works too and is free, but you'd swap the `<video>` tag
for a YouTube iframe embed, which brings back a small amount of YouTube UI
around the player — worth it only if you don't mind that.

## Before uploading: compress if the files are large

Instagram already compresses fairly aggressively, so if these are your
original source exports (not downloaded back off Instagram), check the
file size first. If any file is over ~20-30MB for a ~30 second vertical
video, compress it:

```bash
ffmpeg -i reel-01.mp4 -vcodec libx264 -crf 26 -preset slow -acodec aac -b:a 128k reel-01-compressed.mp4
```

## Poster images

Any frame of the video works as a poster:

```bash
ffmpeg -i reel-01.mp4 -ss 00:00:01 -vframes 1 posters/reel-01.jpg
```

## Local testing

Nothing stops you from keeping the `.mp4` files in this folder
temporarily to test locally in the browser — `.gitignore` is already set
up so they won't accidentally get committed even if they're sitting here.
Just make sure to swap the `src` to the hosted URL before your final push.
