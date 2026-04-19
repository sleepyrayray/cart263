# Project 1 Responses

by Ray Hernaez

## 1- 3D Snake Game
**Link:** https://yaxuanpang.github.io/cart263/topics/project2/

This project feels like a direct upgrade version of the group’s earlier 2D snake game. The dark and retro vibe works really well, especially with the text styling and the overall mood of the game. The controls are simple in theory, but there are a lot of input methods happening at once. Arrow keys move the snake, dragging the mouse rotates the camera, and the voice feature make extra food appear into the grid. The camera control is a smart idea because it adds depth and lets you see the grid from different angles, which makes it feel more like a real 3D space. The voice mechanic is also clever and feels experimental.

That said, the controls fight each other a bit. Even when I rotate the camera, the snake movement stays locked to the original perspective, so arrow keys start feeling confusing the moment you change your view. It would feel more natural if movement adapted to the camera direction (so “up” always means forward from the player’s view). The voice food also only lasts while sound is happening, which made me feel weirdly pressured to keep making noise just to keep the bonus active, then rush to grab it before it disappears. For a game that’s still basically snake, having three control systems adds difficulty more than fun. It would work better as a multiplayer thing where different people handle different inputs. (That's just my take since I like to prioritize fun vs difficulty)

I looked through the repo and noticed a few things... A README would help a lot, since this project has unusual controls and needs quick explanation. Also, keeping everything in one JS file makes it harder to read and expand. This would be a perfect place to use OOP more clearly, like separating the snake, food, and the game itself into their own files. The menu being in HTML is fine because it’s short, but it also could have been handled by a small class if they wanted cleaner structure. Still, the idea is really inventive and I’ve never played a snake version like this before, so it stands out.

---

## 2- Cluster
**Link:** https://namikoko.github.io/connectionsssss/

This project looks polished right off the bat. The tiny and minimal design is cute, clean, and honestly feels professional. The familiar Sanrio characters add instant charm to it and it’s the kind of aesthetic that makes you want to keep clicking around. I also liked the account creation step at the start because it makes it feel like a real app instead of a quick demo. The sound design heightens the experience. Clicking the word boxes feels satisfying because the audio feedback makes every interaction feel more alive. The replayability is strong too, and the day/night css theme toggle is a nice feature that adds variety without overcomplicating anything.

The main downside is originality. It’s well executed, but it didn’t feel like it was taking big creative risks or doing something I hadn’t seen before. The bigger issue is the code organization. Having all the code inside the HTML is messy and hard to maintain. It makes the project feel cluttered in the backend even if the interface looks clean on the frontend. This is exactly the kind of project that would benefit from external JS files and OOP structure, so the logic is separated and readable.

---

## 3- Epic Boxing
**Link:** https://aydanmcgrail.github.io/cart263_FinalProject/

This one is funny. It instantly reminded me of Wii boxing games I played when I was a kid, but with a chaotic edge to it. It made me feel stressed in a fun way, like I was actually in the ring. The opponent design feels like a pointed reference (Donald Trump?), and the whole thing is like a critique through gameplay. It’s weirdly satisfying to land hits, and the exaggerated blood splatter effects when you get hit is both funny and visually effective. The design choice is gross in a cartoon way, but it fits the tone and makes the impacts feel dramatic.

There are a lot of control inputs, which is fine for a boxing game, but I noticed you can still win without moving much. It would feel more intense if the opponent and player movement mattered more, like footwork actually changing your chances. Moving around the ring is fun, but trying to move around and avoid hits while also winning feels difficult, so it becomes more about brute forcing the fight instead of strategy. Still, it’s a strong concept and the energy is there.

On the code side, this was the most satisfying to look at. They used OOP so well and it looks organized, which makes the project feel more solid and expandable. It’s a great mix of humour, visual impact, and clear structure, and it leaves a strong impression.