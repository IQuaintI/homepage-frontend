This is a file that goes over the headache and heartbreak that went into making the homepage on a quasi-technical and spiritual level. 

---

## a whimpering start

When I first began programming it was not done out of anything outside a desire for control. 

I was (and at the time of this pen) held within the confines of the United States Army. While it has brought me a certain degree of ability and fiscal solvency, nothing is without cost. I live my life at the mercy of men who concern themselves overmuch with their own glory or have to break bread with those that would rather commit to arson. I live in conditions that would scare be allowed in the Free World and I eat food that never quite feels like I got what I paid for. Promotions and punishments often feel more akin to a game of cards than creeds admit and I hated the idea of constantly having to tell everyone how *important* I am by the sigil on my chest at all hours of the day. 

I digress. 

What I mean to say is that in the midst of this, I felt a strong urge to do something that existed outside of the realm of Raytheon or Lockheed. After coming to terms with my finances and the soreness I felt after seemingly every day of work, I came to find myself sitting in front of a computer often and wondering what I was going to waste my few precious hours away on. It was only a half-baked wager that I landed on programming among other things I had considered.  Music, art, or even joining a recreational sport, but something about the complexity of programming is what caught my eye. The ability to turn and never turn until. I found the more I spent time reading about it, the more I sought a desire to see these thing come to light. 

So I did and it was as bad as you can imagine and actually worse. It was months of getting nowhere faster than I had thought possible, weeks worth of wondering and so many hours siting there thinking I should have just learned the recorder. Yet, I felt that if I backed down at this point, I would spend the rest of my years searching for something I would never find, if only for my inability to decide. And that deciding was no easy consider. The time spent here have been spent mostly alone and in a poorly lit room, burning what remains of my retinas in a meager attempt to create something that I lack the experience to even explain. 

I have quit more times than I would care to admit and even now don't consider myself much of a developer. I will admit that I use AI assistance in no small amount not because I don't necessarily understand the theory (although this has been the case at times), but rather that the amount of syntax you would have to be familiar with to create a semi-functional anything is astounding. I tried at first to go without, but ended up spending more time searching Stack for how to center a div then actually doing it.

There have been other works and test runs and like, but this is the first to get to production. The first where you, a lay-person with nothing better to do than to read such ramblings, can indulge in the opulence of my ignorance. 

In truth, I thought I would be happier at this point, but I a more tired than anything and the hard part is always yet to come. 

## oh where oh where could my prince be

I will now go into a brief explanation into how this should play out. I will start by explaining the desire -> design -> logic -> further implementation. I will warn you thought that at times it will get confusing and should this aggravate you, understand that I am also confused as I attempt to explain something I have a flicker of an idea about. 

This  tooth-pulling serves as both a means to explain to others what I have done and also to myself, since much is abstracted away due to a higher generosity. I will try to not keep this so dry as to desert you, but it **is** something of a technical nature. 

With all that out of the way, let us start on something that I could wager even the finest developers have issues with and that is:

## who is babel

Once I had decided to tackle the absurd notion of a building a website with the old pair of pliers and stale glue I had on hand, I needed to figure out what other tools I was going to need. At this point I was only familiar with JS, CSS, HTML and had a cursory understanding of React. I was on the fence about using it since I was aware there was other options and decided to try out one of them - Django. 

Now instead of just not really knowing just one framework I can say I have two now under my belt. I decided to use React on the front anyways for the sole purpose of not having a mono-framework project. Django makes up the backend and it works somehow.  Now to be more specific, I did not use React proper but instead used Vite. Why? React kept giving me like 100 different issues upon app start, that after hours of trouble shooting to only end up at 1000 problems, I had to look for alternatives. Vite was selected due to (perceived) ease of use.

People often say that CSS is not a real programming language. These people are liars. I find the cascading nature of CSS to be so confusing at times as to what is affecting what, that I just use Tailwind. Does having it all in-line look uglier at times? Yes. Do I have any understanding as to the syntax that tailwind uses specifically? No. However, along my journey I decided that it would be better to send it and then backtrack a working model. It gets me learning and I see just enough to continue. 

The HTML is just standard boilerplate stuff that I am 120% positive is not to "code". It just works and for that I am grateful. 

Now, you might be thinking so far as to how I managed to get through all this and I was shocked to when I got all these tools together, but there are two things that cause so much agony that I almost threw the whole internet away. ***React router and PropTypes***. Getting a page to link to another page without using React required like one letter and some luck. Setting up the routes and like was a harrowing mess that resulted in me spending lifetimes just getting a single link to work. It's better now, but I still have heat flashes whenever I had to add a new page. PropTypes I have no issues with. It was passing props without it that resulted in everything being reliant on everything else in a way a house of cards would be.  I did research and ended up finding out that the issue was lovingly called *Prop Drilling Hell*. 

Yay.
## carpel tunnel

When I tell you that I had no idea that certain things needed to go into certain folders so that the internet would now where they are, **I mean it**. I quite literally built a half-descent front and then when I tried to publish it, literally nothing loaded. I was beyond myself in a place where only failures go and realized I never even moved. When you are doing local stuff, there are no laws it seems. The wild west of programming where everything feels good and it only hurts all the time. I did not even know what a public folder was until I watched some YouTube videos about frontend development and they just happened to have one, so I looked it up and was like "OK".

Just about every website you come across has a little image in the tab next to a word or thing. I had no idea what that was called and if I could snapshot my google searches from back then, they would have put me on a watchlist. The crazy part is that in Visual Studio Code, it tells you in a little sentence that there is no favicon and I just assumed that it was like a security issue to patch out later. Could I have looked it up to make sure? Yeah. Yet, if I look up everything that confuses me, I would never see the ground again. 

After re-wiring the whole project a few times and spending night weeping in the crawlspace, the project ended up looking like this:

```plaintext
└── homepage-frontend/
    ├── public/
    │   ├── images/favicon.jpg
    │   └── vite.svg
    ├── src/
    │   ├── api/
    │   │   ├── api.js
    │   │   └── WeatherApi.js
    │   ├── apps/
    │   │   └── weather/
    │   │       └── components/
    │   │           ├── LocationInfo.jsx
    │   │           ├── LocationService.js
    │   │           ├── WeatherDisplay.jsx
    │   │           ├── WeatherApp.css
    │   │           └── WeatherApp.jsx
    │   ├── assets/
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   └── input.tsx
    │   │   ├── weather/
    │   │   │   ├── Button.jsx
    │   │   │   ├── Card.jsx
    │   │   │   └── Input.jsx
    │   │   └── /
    │   │       ├── About.jsx
    │   │       ├── Footer.jsx
    │   │       ├── Header.jsx
    │   │       ├── ProjectCard.jsx
    │   │       └── ProjectsSection.jsx
    │   ├── lib/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── .env
    ├── .gitattributes
    ├── .gitignore
    ├── components.json
    ├── eslint.config.js
    ├── postcss.config.cjs
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── vite.config.js
    ├── README.md
    ├── package.json
    └── package-lock.json
```

I have no idea what this looks like compared to other projects, but Chat said that it looks almost presentable and we are a C-student type beat. 

I recall my first attempt, not having the *src* folder labeled as such. I think it was like homepage or something. I have learned my lesson and spent a great deal of time deciding as to what I was going to sub-folder things. This might sound absurd, but when I first started coding, I just gave the folders non-sensical names because it was purely for my own reference. This works on smaller test runs, but when the project started to get bigger, I could not find anything. How surprising. 

After a brief confessional, I decided to divide things up based on typing - CSS with CSS and JSX with JSX. This worked for a bit, but collapsed once I grew tired of dancing through the sidebar trying to find the CSS for a page I was just working on. (**NOTE:** I did in fact try to use CSS to start which is why some files might still be present although empty). Folders began being clustered via relationship to other files within the folder. This is why now, the *api* folder has all of the api in although I have a weather folder that could house it. CSS is now sitting in the folder that it alters. All is right with the world. 

The components folder is a interesting one, because I believe that things go there that comprise the greater whole, but when you are working on something that is not overly complex (or are a rookie), finding parts to break into smaller parts is not easy. The *ui* folder is one that is a byproduct of *shadcn*, or at least an attempt to use it. I could not get it quite how I wanted it and opted for customs instead. I left them there because to be frank I forgot them when I uploaded and I have other things to do then delete them at the moment. 

I am not entirely sure about all the stuff at the bottom that starts from .*gitattributes* and down. I get that they are configuration files, but I never tinker with them unless instructed otherwise, because things usually just works out of the box. 

## bricked at the free throw 

I have decided to dedicate a section to something that while not in the realm of programming does have an affect on it - hosting. 

Once I had a semi-functional on my end, I wanted to take the next magical leap and make it accessible on the World Wide Web. I am poor. An easy parley I know, but most hosting places want money. I understood that a server, power, personnel, and like all cost money, but the my wallet didn't. A common issue.

My first attempt was to use GitHub Pages. It worked and for a time I was content with my little work of wonder. Yet, I came across two large issues that laid me flat. First, GitHub Pages limited me to having a published site be no larger than 1GB. At this point in production I was not sure about how large this site would grow to be and wanted to give myself room to grow without worrying about such constraints. The other more immediate issue was that GitHub Pages takes like a forever and a half to update. It was **quite** aggravating getting something to work on my end and wanting to see if works in production and having to wait like 10 minutes. 

So I did what any reasonable person does and swapped over to another service. After careful(?) research, I landed on Netlify. I offered more and I was like cool. I was not sure how much more I needed but it worked for the longest. Then I grew bold. I had a homepage that was not this one per se, but similar and when you went to a project (god those were rough), it brought to another page that was being hosted on Netlify. So, if you were at homepage.com and clicked on a recipe book project, it would not be homepage.com/recipe_book. It would be a whole other site like recipebook.com or something. (At this point I did not have custom names either so there was an odd string of letters and such that sat before the actual URL I wanted. This is just example clearly). I viewed this as good compartmentalization, but it became more annoying to have to work and edit like four different sites. In earnest, the projects themselves were closer to proof-of-concept and did not have need of a separate repository, but I was eager to show something. 

Then I got bold. I wanted to try to create a backend. I had no idea what it was or even how to spell it, but I wanted to test my limits a bit more. Netlify did not serve backends apparently. I had to go elsewhere for it and that was Digital Ocean. Trust my surprise when everything was in terminal. **Trust it!** The computer I worked on was not a quick one either so going through lines of code on their was an exercise in patience. Then there was the dreaded nano or vim. I could not use either. They feel like I am riding a dinosaur and not a particularly cool one. I ended up just writing the code in VSC and then copy pasting it into the back. Once I got the backend connected to the the frontend, I came to a realization that I was paying for two different services where one would suffice. 

I ported the front to Digital Ocean and after spending to much time on SSH shenanigans (for some reason the backend was not accepting pushes) it was up. Now I just pay roughly $10.00 a month between the server itself and my interactions with it. Should this thing ever grow, I hope I find better employment come then. 

## mashed no gravy

I am going into shock at the thought of this pen. I used Gunicorn and Nginx to be the man-in-the-middle for this project. I picked them because that is what was recommended to me for collaboration with Django. I so much time trying to get those two to cooperate that I should be hired at the United Nations. 

One would be listening but the other one would not be. One would be on and the other would be off. One would be on this port, the other would be on another planet. I tried to use the UNIX socket and Nginx never seemed to want to connect and when it did it only worked local. I cried often and just swapped to using a regular port. This was one of the few choices that I had to walk back because I could not get it to function properly. I had also tried to create a dark/light mode button and while that functioned, it was low-key (high-key) ugly and I disposed of it. This however, never had a working prototype and I tried to push through using whatever stubbornness that I had within me and could not break the mold. I could have persisted, but the only thing that takes more time than climbing the mountain is knowing when to climb back down. 

I made peace. 

## gulag

If there is one thing that "regret" most is that I did not plan as much as a I felt I should have. I tried figma and while it was useful from a design standpoint (I did end up keeping the design), there was so much in the way of logistical issues that I feel had I followed a guide, would have been alleviated. I was not sure what I wanted to do in it's fullness and as such could not really find a video or what to assist in creating something from not much. 

Now, I have some more experience on how API's work and how things connect front to back, further attempts within this realm should be easier even if I don't understand every line. A part of me still feels like a fake developer and this whole adult thing feels more trial and error than the adults in my youth led me to believe. I have never done documentation before and to be honest, if someone wanted to learn what my code did they could just look at it. This was here more as a means to explain to you, dear reader, what my thinking behind some decisions were even the ones that blew up in transit. 

If you made it this far - your welcome. 