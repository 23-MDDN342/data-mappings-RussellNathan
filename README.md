### Nathan Russell MDDN342 Project 3: Data Mappings
MY design intentions with this project make no detour from those in project 2. I will design a program that can map a convincingly hand-drawn face onto photos of human faces with machine learning.

Many details in the human subjects will affect the parameters of the design including age and smile. The parameters changed include jitter, brush size and brush blemishes.

v2
Many days were lost trying to adapt the loadStrings function from my Project 2 code to Project 3. This function was supposed to load the arrays of coordinates for the shapes of different parts of the face. I concluded that because of the hierarchy of this project, it just isn't possible to load strings with the preload function like I usually would, because for some reason anything loaded here would be outside of the scope of any functions run afterward. Maaybe if I spent more time I could figure out a fix for this but otherwise it seems a better use of my time to just hardcode the coordinates into the face.js script and move on.
Given the context of the delivery for this project, I see no significant disadvantages to hardcoding the coordinates outside of the aesthetics of how the code looks.

v3
THe model has been trained on all of the images to identify both age and emotional valence (sadness/happiness). A higher age will result in the brush strokes being more jittery, and a higher emotional valence results in a fuller brush stroke.

v4
Further improved how the trained data controls the face values. The mouth is now reactive to the pose of the image, how much open the mouth is changes the mouth shape to be drawn.

v5
Eyes are now also reactive.