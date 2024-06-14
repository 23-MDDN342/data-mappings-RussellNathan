/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 2;

//  Brush detail sets the quality of the brush strokes, a high value is slower but looks better
let BrushDetail = 100;
let iEyeL = 3;
let iEyeR = 3;
let iNose = 1;
let iMouth = 1;
let bezierJoin  = 0;
let coords;

//  Here are the bezier coordinates for each face part
let eyesCoords  = [
  [-6.169677419,-1.227567568,-6.169677419,-1.227567568,-3.498387097,-1.367027027,-1.901612903,-1.357837838,-0.30483871,-1.348648649,0.864193548,-1.328648649,1.76483871,-1.390540541],
  [2.022580645,0.386486486,-1.765806452,1.057837838,-2.138709677,1.197297297,-3.511612903,1.336756757,-2.326129032,1.127027027,-2.138709677,1.197297297,-2.951290323,1.267567568,-0.301612903,-0.192162162,0.764516129,-0.694594595,0.830645161,-1.197027027,1.866129032,0.144594595,3.022580645,0.927027027,2.022580645,0.386486486,-1.765806452,1.057837838,-2.138709677,1.197297297,-3.138709677,1.197297297],
  [3.61,1.155675676,3.61,1.155675676,3.156774194,-0.457297297,2.614516129,-0.584054054,1.980967742,-0.732162162,-1.501290323,-1.845945946,-2.224193548,-1.081621622,-3.000645161,-0.260540541,-1.543548387,0.326756757,-0.254516129,0.341351351,1.373548387,0.35972973,2.595806452,-0.451621622,3.144193548,-0.122162162,3.37483871,0.016216216,3.399354839,0.065675676,3.618709677,0.241081081],
  [0.274516129,-1.142432432,0.274516129,-1.142432432,-3.768064516,-0.126486486,-0.380322581,1.973513514,3.007096774,4.073243243,2.914516129,-0.452972973,1.61483871,-0.702972973,0.31516129,-0.952972973,-2.668387097,-2.102972973,-2.363548387,0.085945946,-2.058387097,2.274864865,0.686774194,3.28027027,1.979677419,1.491351351,3.272580645,-0.297297297,1.110967742,-2.464054054,-1.236129032,-1.075135135,0.274516129,-1.142432432,-3.768064516,-0.126486486,-0.380322581,1.973513514],
  [-2.46,-0.39,-2.4044,-0.496,-2.22,-0.63,-2.0356,-0.764,-1.2382,-1.05,-0.54,-1.11,0.1582,-1.171,1.0596,-1.096,1.38,-0.87,1.7004,-0.645,2.1272,-0.168,1.86,0.09,1.5928,0.348,1.3967,0.535,0.9,0.57,0.4033,0.605,-0.0427,0.684,-0.54,0.57,-1.0373,0.455,-1.2615,-0.014,-1.26,-0.15,-1.2585,-0.286,-1.0272,-0.767,-0.3,-0.87,0.4272,-0.974,1.1736,-0.951,1.38,-0.63,2.0449,0.403,1.8195,0.818,1.419,0.986,1.0185,1.153,0.2036,1.136,-0.3,1.29,-0.8679,1.463,-0.7558,1.463,-0.78,1.53],
  [-2.268709677,-0.395135135,-2.268709677,-0.395135135,-1.529677419,-1.532702703,0.711935484,-1.492432432,2.953548387,-1.451891892,3.773225806,-0.267297297,3.773225806,-0.267297297,3.773225806,-0.267297297,2.74483871,-1.62027027,0.703870968,-1.404864865,-1.336774194,-1.189459459,-1.794516129,-0.57,-1.778709677,0.028918919],
  [-2.774516129,-0.054324324,-2.774516129,-0.054324324,-1.43,-1.487297297,0.312258065,-1.420540541,2.054193548,-1.354054054,2.961290323,0.205675676,2.961290323,0.205675676,2.961290323,0.205675676,-0.292580645,0.825675676,-1.326451613,0.412432432,-2.360645161,-0.000810811,-2.042580645,-0.120810811,-2.042580645,-0.120810811,-2.774516129,-0.054324324,-1.43,-1.487297297,0.312258065,-1.420540541000000,2.816451613,-2.217567568,2.816451613,-2.217567568,2.455483871,-1.091081081,2.09483871,-0.768108108,0.529032258,-1.248918919,0.121612903,-2.854054054,0.561935484,-1.977027027,0.529032258,-1.248918919,0.221290323,1.432162162,0.049354839,-0.140540541,0.237741935,1.095675676,0.221290323,1.432162162,-1.110322581,-0.960540541,-2.315483871,-2.402972973,-1.184193548,-2.031891892,-1.110322581,-0.960540541,-2.42,1.033243243,-1.261290323,-0.318108108,-1.939032258,0.794864865,-2.42,1.033243243,2.377419355,0.457027027,2.385483871,0.903243243,2.377419355,0.457027027,2.377419355,0.457027027,2.816451613,-2.217567568,2.816451613,-2.217567568,2.455483871,-1.091081081,2.09483871,-0.768108108],
  [0,0]
];
let pupilCoords = [
  [-1.622258065,-0.78972973,-1.622258065,-0.78972973,-2.18,-1.211351351,-2.273225806,-0.843513514,-2.366129032,-0.475405405,-1.611935484,-0.260810811,-1.229677419,-0.467837838,-0.847419355,-0.674864865,-1.095483871,-1.035135135,-1.580967742,-1.081081081,-2.066451613,-1.127027027,-2.128387097,-0.78972973,-2.004516129,-0.682432432,-1.880645161,-0.575135135,-1.281290323,-0.375945946,-1.229677419,-0.782162162,-1.178064516,-1.188378378,-1.55,-1.372432432,-1.839354839,-1.288108108,-2.128387097,-1.203783784,-2.779354839,-1.073513514,-2.376451613,-0.345135135,-1.973548387,0.382972973,-1.353548387,-0.122972973,-1.198709677,-0.237837838,-1.043870968,-0.352972973,-0.423870968,-0.659459459,-1.105806452,-1.05027027]
];
let noseCoords  = [
  [0.022972973,3.085945946,-1.315675676,2.929032258,-0.089864865,3.751451613,0.387837838,0.320967742,0.057297297,0.521290323,-0.656486486,1.268823529,-1.964756757,1.933870968,-1.245945946,1.644193548,-0.704864865,2.661290323,0.157162162,0.68516129,0.759459459,1.028064516,-0.271351351,1.607741935],
  [0.191290323,-0.439189189,0.191290323,-0.439189189,0.140967742,-0.44972973,0.128387097,-0.344594595,0.115806452,-0.239459459,0.48,1.905945946,0.567741935,2.242432432,0.655806452,2.578918919,1.232903226,4.240540541,1.220322581,4.419459459,1.208064516,4.598108108,1.007096774,4.482432432,1.007096774,4.524594595,1.007096774,4.566486486,0.542580645,1.495945946,0.542580645,1.274864865,0.542580645,1.054054054,0.994516129,1.737837838,1.358387097,1.905945946,1.722580645,2.074324324,-0.486451613,2.337027027,-0.838064516,2.421351351,-1.189354839,2.505405405,-1.302580645,2.358108108,-1.452903226,2.368648649,-1.603548387,2.379189189,-1.766774194,2.484324324,-1.766774194,2.484324324],
  [0.366451613,-0.593243243,0.366451613,-0.593243243,-0.363225806,-0.132702703,-0.327096774,0.169189189,-0.291290323,0.471081081,-0.12,0.72027027,0.10516129,0.878918919,0.330645161,1.037297297,1.510967742,1.369459459,1.691290323,1.588378378,1.871290323,1.807567568,2.38483871,2.434054054,2.321935484,2.660540541,2.258709677,2.887027027,1.799354839,3.407837838,1.051290323,3.558918919,0.303548387,3.71,-1.192258065,4.117567568,-1.831935484,3.823243243,-2.471612903,3.528648649,-3.181935484,2.250540541,-1.46,1.798108108,-0.482580645,1.541081081,1.087096774,1.822702703,1.303870968,2.184864865,1.519354839,2.545675676,0.585806452,3.189189189,-0.068709677,3.075405405,-0.504516129,3,-1.876129032,3.185135135,-1.488709677,2.626486486,-1.101290323,2.067837838,-0.479354839,2.482702703,-0.38,2.512972973],
];
let mouthCoords = [
  [2.620967742,-0.695675676,2.342903226,-0.852972973,2.192903226,-1.041621622,2.042580645,-1.230540541,1.76483871,-1.375135135,1.719677419,-1.40027027,1.674516129,-1.425675676,1.389032258,-1.035405405,1.201290323,-0.915945946,1.013548387,-0.796216216,0.292580645,-0.261351351,0.16483871,-0.305405405,0.037419355,-0.349459459,-0.803870968,-1.35,-1.104193548,-1.356216216,-1.40483871,-1.362702703,-2.651612903,-0.311891892,-2.689032258,-0.185945946,-2.726774194,-0.06,2.448064516,0.336486486,2.666129032,0.267297297,2.883870968,0.197837838,2.358064516,0.128648649,2.200322581,0.141351351,2.042580645,0.153783784,-0.067741935,0.273513514,-1.074193548,0.128648649,-2.080645161,-0.015945946,-2.523870968,0.424594595,-2.531290323,0.518918919,-2.538709677,0.613243243,-0.939032258,1.034864865,-0.037741935,1.17972973,0.863548387,1.324324324,1.952580645,1.343243243,2.388064516,1.223783784,2.823548387,1.104054054,2.620967742,1.154324324,2.620967742,1.154324324],
  [2.763870968,-0.344594595,2.561290323,-1.175135135,2.065483871,-1.168918919,1.569677419,-1.162432432,0.720967742,-1.521081081,-0.382903226,-1.301081081,-1.487096774,-1.080810811,-2.613548387,-0.822702703,-2.636129032,-0.256486486,-2.658709677,0.31,-2.290645161,0.838648649,-1.772258065,1.146756757,-1.254193548,1.455135135,1.457096774,1.014864865,1.892903226,1.058648649,2.328387097,1.102702703,1.314516129,-1.571621622,1.314516129,-1.571621622,1.314516129,-1.571621622,2.163225806,0.630810811,1.892903226,0.901351351,1.622258065,1.172162162,0.646129032,1.159459459,0.563548387,1.109189189,0.480645161,1.058648649,0.022580645,-1.288378378,0.04516129,-1.546486486,0.067741935,-1.804324324,0.345483871,0.083513514,0.353225806,0.549189189,0.360645161,1.014864865,0.187741935,1.26027027,-0.420645161,1.165675676,-1.028709677,1.071351351,-1.336774194,-0.885675676,-1.419354839,-1.206486486,-1.501935484,-1.527567568,-0.968709677,-0.124324324,-1.066451613,0.026756757,-1.164193548,0.177837838,-2.388387097,0.64972973,-2.448387097,0.549189189,-2.508387097,0.448378378,-0.473225806,0.114864865,-0.037419355,0.102162162,0.398064516,0.08972973,1.862580645,0.039459459,2.065483871,0.08972973,2.268387097,0.14,2.658709677,0.165135135,2.658709677,0.165135135],
  [-2.46,-0.39,-2.4044,-0.496,-2.22,-0.63,-2.0356,-0.764,-1.2382,-1.05,-0.54,-1.11,0.1582,-1.171,1.0596,-1.096,1.38,-0.87,1.7004,-0.645,2.1272,-0.168,1.86,0.09,1.5928,0.348,1.3967,0.535,0.9,0.57,0.4033,0.605,-0.0427,0.684,-0.54,0.57,-1.0373,0.455,-1.2615,-0.014,-1.26,-0.15,-1.2585,-0.286,-1.0272,-0.767,-0.3,-0.87,0.4272,-0.974,1.1736,-0.951,1.38,-0.63,2.0449,0.403,1.8195,0.818,1.419,0.986,1.0185,1.153,0.2036,1.136,-0.3,1.29,-0.8679,1.463,-0.7558,1.463,-0.78,1.5300000],
];

// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

function Face() {
  // these are state variables for a face
  this.detailColour = [5,5,15];
  this.backColour = [230,235,240];
  this.vAge  = 50; // Age setting: range is 0 to 100
  this.vEmo = 4;  // Emotional Valence (sad/happy) setting: range is 2 to 4
  this.faceDirection  = 0;  // is either 0 or 1 (0 is facing left, 1 is facing right)

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    ellipseMode(CENTER);

    if (segment_average(positions.chin)[0] > 0){
      this.faceDirection  = 0;
    }
    else  {this.faceDirection  = 1;}

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    let nose_cent_pos = segment_average(positions.nose_bridge);
    let mouth_posX = (segment_average(positions.top_lip)[0]  +   segment_average(positions.bottom_lip)[0]  / 2);
    let mouth_posY = (segment_average(positions.top_lip)[1]  +   segment_average(positions.bottom_lip)[1]  / 2);
    this.mouthWidth = (positions.top_lip[6][0]-positions.top_lip[0][0]);
    this.mouthType = (positions.bottom_lip[4][1]-positions.top_lip[4][1])/this.mouthWidth;
    // ellipse(positions.top_lip[0][0],positions.top_lip[0][1],1);
    // ellipse(positions.top_lip[6][0],positions.top_lip[6][1],1);
    this.left_brow_height  = (left_eye_pos[1] - segment_average(positions.left_eyebrow)[1]);
    this.right_brow_height = (right_eye_pos[1] - segment_average(positions.right_eyebrow)[1]);

    let pointA;
    let pointB;
    //head
    pointA  = [positions.left_eye[0][0],positions.chin[6][1]];
    pointB  = positions.chin[9];
    Scribble(pointA,pointB,this.vEmo,this.backColour);
    pointA  = positions.chin[10];
    pointB = [positions.nose_bridge[1][0]-0.1,positions.nose_bridge[3][1]];
    Scribble(pointA,pointB,this.vEmo,this.backColour);
    pointA  = segment_average(positions.bottom_lip);
    pointB = [positions.chin[4][0],positions.chin[1][1]];
    Scribble(pointA,pointB,this.vEmo,this.backColour);   
    pointA  = [positions.chin[6][0]-0.2,positions.chin[5][1]];
    pointB = positions.chin[13];
    Scribble(pointA,pointB,this.vEmo,this.backColour);
    pointA  = [positions.left_eye[0][0]-0.2,positions.right_eye[3][1]];
    pointB = positions.chin[16];
    Scribble(pointA,pointB,this.vEmo,this.backColour);
    pointA  = [positions.right_eye[3][0]-0.2,positions.nose_bridge[1][1]];
    pointB = [0,-1.5];
    Scribble(pointA,pointB,this.vEmo,this.backColour);

    //stroke parameters
    stroke('black');
    strokeWeight(0.1);
    fill('black');
    

    //PUPIL LEFT
    coords  =   pupilCoords[0];
    let L_pupilTransX = left_eye_pos[0];
    let L_pupilTransY = left_eye_pos[1]+0.2;
    let L_pupilOffsetX = -1.5;
    let L_pupilOffsetY = -0.2;
    let L_pupilScale  = map(this.vAge,0,100,0.2,0.5);

    this.DrawShape(coords,   L_pupilTransX,L_pupilTransY,    L_pupilOffsetX,L_pupilOffsetY,    L_pupilScale,1,1,0,0);
    
    //EYE LEFT
    iEyeL = int(map(this.left_brow_height,0.37,0.6,0,7,true));
    coords  =   eyesCoords[iEyeL];
    let L_eyeTransX = left_eye_pos[0];
    let L_eyeTransY = left_eye_pos[1];
    let L_eyeOffsetX = 0.5;
    let L_eyeOffsetY = -0.4;
    let L_eyeScale  = 1/4;
    if (iEyeL==4)  {L_eyeScale  = 1/2.5}
    // define if the gaps in the beziers should be bridged, as some shapes contain disjointed parts
    if (iEyeL==6)  {
        bezierJoin = 2;
    } else  {bezierJoin = 0;}

    this.DrawShape(coords,   L_eyeTransX,L_eyeTransY,    L_eyeOffsetX,L_eyeOffsetY,    L_eyeScale,1,1,0,bezierJoin);

    //PUPIL RIGHT
    coords  =   pupilCoords[0];
    let R_pupilTransX = right_eye_pos[0];
    let R_pupilTransY = right_eye_pos[1]+0.2;
    let R_pupilOffsetX = -1.5;
    let R_pupilOffsetY = -0.2;
    let R_pupilScale  = map(this.vAge,0,100,0.2,0.5);

    this.DrawShape(coords,   R_pupilTransX,R_pupilTransY,    R_pupilOffsetX,R_pupilOffsetY,    R_pupilScale,1,1,0,0);

    //EYE RIGHT
    iEyeR = int(map(this.right_brow_height,0.37,0.6,0,7,true));
    coords  =   eyesCoords[iEyeR];
    let R_eyeTransX = right_eye_pos[0];
    let R_eyeTransY = right_eye_pos[1];
    let R_eyeOffsetX = 0.5;
    let R_eyeOffsetY = -0.4;
    let R_eyeScale  = 1/4;
    if (iEyeR==4)  {R_eyeScale  = 1/2.5}
    // define if the gaps in the beziers should be bridged, as some shapes contain disjointed parts
    if (iEyeR==6) {
        bezierJoin = 2;
    }
    this.DrawShape(coords,   R_eyeTransX,R_eyeTransY,    R_eyeOffsetX,R_eyeOffsetY,    R_eyeScale,-1,1,0,bezierJoin);
    bezierJoin = 0;

    //NOSE
    iNose   =   round(map(this.vAge,20,75,0,2,true));
    coords  =   noseCoords[iNose];
    let noseTransX = nose_cent_pos[0]+0.1;
    let noseTransY = nose_cent_pos[1]-0.3;
    let noseOffsetX = 0.2;
    let noseOffsetY = 0;
    let noseScale  = 1/3;
    let noseScaleX  = -1;
    if (iNose==0){
      noseOffsetY = 0.4;
      noseScaleX  = 1;
      bezierJoin = 2;
    }
    if (this.faceDirection==1){
      noseScaleX *= -1;
    } 
    this.DrawShape(coords,   noseTransX,noseTransY,    noseOffsetX,noseOffsetY,    noseScale,noseScaleX,1,0,bezierJoin);   
    bezierJoin = 0;

    //MOUTH
    iMouth  =   round(map(this.mouthType,0.3,0.6,0,2,true));
    coords  =   mouthCoords[iMouth];
    let mouthTransX = 0 + mouth_posX;
    let mouthTransY = 0 + mouth_posY;
    let mouthOffsetX = 0;
    let mouthOffsetY = 0;
    let mouthScale = this.mouthWidth/2.8-0.2;
    let mouthScaleX = 1;
    if (iMouth==1){
      mouthScaleX *= -1;
    }
    if (this.faceDirection==1){      
      mouthScaleX *= -1;
    }

    this.DrawShape(coords,   mouthTransX,mouthTransY,    mouthOffsetX,mouthOffsetY,    mouthScale,mouthScaleX,1,0,bezierJoin);
  }

  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  this.DrawShape = function(coords,dotTransX,dotTransY,dotOffsetX,dotOffsetY,shapeScale,shapeScaleX,shapeScaleY,shapeTilt,bezierJoin){
    push();
    // stroke('black');
    // strokeWeight(this.vEmo/20);
    noStroke();
    fill(this.detailColour,map(this.vAge,0,100,255,40));

    translate(dotTransX, dotTransY);
    scale(shapeScale*shapeScaleX,shapeScale*shapeScaleY);
    // print(coords);
    for (let i=0; i<coords.length; i+=(6+bezierJoin))
    {
        for (let j=0; j<1; j+=1/BrushDetail){
            ellipse(
                //x bezier coords
                bezierPoint(coords[i+0]  -dotOffsetX,    coords[i+2]  -dotOffsetX,    coords[i+4]  -dotOffsetX,    coords[i+6]  -dotOffsetX,    j)  + (noise(i*coords.length,j*2)-0.5)  * this.vAge/80,
                //y bezier coords
                bezierPoint(coords[i+1]  -dotOffsetY,    coords[i+3]  -dotOffsetY,    coords[i+5]  -dotOffsetY,    coords[i+7]  -dotOffsetY,    j)  + (noise(i*coords.length,j*2+10000)-0.5)  * this.vAge/80,
                // j/1.7+(PI%i)/100  );
              j*(this.vEmo/5)+(noise(i*coords.length,j)-0.5)*this.vAge/100);
        }
    }
    // ellipse(-4,coords[8],1);
    pop();
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.vAge = int(map(settings[0], 20, 80, 20, 80, true));
    this.vEmo = map(settings[1], 20, 100, 2, 4, true);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(2);
    settings[0] = map(this.vAge, 0, 100, 0, 100);
    settings[1] = map(this.vEmo, 2, 4, 0, 100);
    return settings;
  }
}

function Scribble(pointA,pointB,vEmo,ink){
  push();
  let ldiv  = 20;
  let lcount  = 10;
  let ldist = 2;
  let nDetail = 15;
  let nAmp  = 7;
  // let = 0.1;
  stroke(ink);
  // strokeWeight(1);
  translate(-ldist/2,-ldist/8);
  for (let h=0; h<lcount; h+=1){
    translate((ldist/lcount/2)*noise(h),-(ldist/lcount)*noise(h+100));
    for (let i=0; i<ldiv; i+=1){
      strokeWeight(vEmo/30*map(noise(h,i/10),0,1,0.1,1.3));
      line(
        lerp(pointA[0] + noise((h*20+i)/nDetail)*nAmp/5,pointB[0]   +         noise((h*20+i)/nDetail+100)*nAmp/5,i/(ldiv)),
        lerp(pointA[1] + noise((h*20+i)/nDetail)*nAmp/5,pointB[1]   +         noise((h*20+i)/nDetail+100)*nAmp/5,i/(ldiv)),
        lerp(pointA[0] + noise((h*20+i)/nDetail+1/nDetail)*nAmp/5,pointB[0] + noise((h*20+i)/nDetail+100+1/nDetail)*nAmp/5,(i+1)/(ldiv)),
        lerp(pointA[1] + noise((h*20+i)/nDetail+1/nDetail)*nAmp/5,pointB[1] + noise((h*20+i)/nDetail+100+1/nDetail)*nAmp/5,(i+1)/(ldiv))
      );
    }
  }
  pop();
}