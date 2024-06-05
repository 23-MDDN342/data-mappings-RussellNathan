/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used
const stroke_color = [95, 52, 8];
/*
 * some text here
 */
let BrushDetail = 100;
let iEye = 3;
let iNose = 2;
let iMouth = 1;
let sPupil  = 0.5;

let eyesCoords  = [
  [-2.46,-0.39,-2.4044,-0.496,-2.22,-0.63,-2.0356,-0.764,-1.2382,-1.05,-0.54,-1.11,0.1582,-1.171,1.0596,-1.096,1.38,-0.87,1.7004,-0.645,2.1272,-0.168,1.86,0.09,1.5928,0.348,1.3967,0.535,0.9,0.57,0.4033,0.605,-0.0427,0.684,-0.54,0.57,-1.0373,0.455,-1.2615,-0.014,-1.26,-0.15,-1.2585,-0.286,-1.0272,-0.767,-0.3,-0.87,0.4272,-0.974,1.1736,-0.951,1.38,-0.63,2.0449,0.403,1.8195,0.818,1.419,0.986,1.0185,1.153,0.2036,1.136,-0.3,1.29,-0.8679,1.463,-0.7558,1.463,-0.78,1.53],
  [2.022580645,0.386486486,-1.765806452,1.057837838,-2.138709677,1.197297297,-3.511612903,1.336756757,-2.326129032,1.127027027,-2.138709677,1.197297297,-2.951290323,1.267567568,-0.301612903,-0.192162162,0.764516129,-0.694594595,0.830645161,-1.197027027,1.866129032,0.144594595,3.022580645,0.927027027,2.022580645,0.386486486,-1.765806452,1.057837838,-2.138709677,1.197297297,-3.138709677,1.197297297],
  [3.61,1.155675676,3.61,1.155675676,3.156774194,-0.457297297,2.614516129,-0.584054054,1.980967742,-0.732162162,-1.501290323,-1.845945946,-2.224193548,-1.081621622,-3.000645161,-0.260540541,-1.543548387,0.326756757,-0.254516129,0.341351351,1.373548387,0.35972973,2.595806452,-0.451621622,3.144193548,-0.122162162,3.37483871,0.016216216,3.399354839,0.065675676,3.618709677,0.241081081],
  [0.274516129,-1.142432432,0.274516129,-1.142432432,-3.768064516,-0.126486486,-0.380322581,1.973513514,3.007096774,4.073243243,2.914516129,-0.452972973,1.61483871,-0.702972973,0.31516129,-0.952972973,-2.668387097,-2.102972973,-2.363548387,0.085945946,-2.058387097,2.274864865,0.686774194,3.28027027,1.979677419,1.491351351,3.272580645,-0.297297297,1.110967742,-2.464054054,-1.236129032,-1.075135135,0.274516129,-1.142432432,-3.768064516,-0.126486486,-0.380322581,1.973513514],
  [-6.169677419,-1.227567568,-6.169677419,-1.227567568,-3.498387097,-1.367027027,-1.901612903,-1.357837838,-0.30483871,-1.348648649,0.864193548,-1.328648649,1.76483871,-1.390540541],
  [-2.268709677,-0.395135135,-2.268709677,-0.395135135,-1.529677419,-1.532702703,0.711935484,-1.492432432,2.953548387,-1.451891892,3.773225806,-0.267297297,3.773225806,-0.267297297,3.773225806,-0.267297297,2.74483871,-1.62027027,0.703870968,-1.404864865,-1.336774194,-1.189459459,-1.794516129,-0.57,-1.778709677,0.028918919],
  [-2.774516129,-0.054324324,-2.774516129,-0.054324324,-1.43,-1.487297297,0.312258065,-1.420540541,2.054193548,-1.354054054,2.961290323,0.205675676,2.961290323,0.205675676,2.961290323,0.205675676,-0.292580645,0.825675676,-1.326451613,0.412432432,-2.360645161,-0.000810811,-2.042580645,-0.120810811,-2.042580645,-0.120810811,-2.774516129,-0.054324324,-1.43,-1.487297297,0.312258065,-1.420540541000000,2.816451613,-2.217567568,2.816451613,-2.217567568,2.455483871,-1.091081081,2.09483871,-0.768108108,0.529032258,-1.248918919,0.121612903,-2.854054054,0.561935484,-1.977027027,0.529032258,-1.248918919,0.221290323,1.432162162,0.049354839,-0.140540541,0.237741935,1.095675676,0.221290323,1.432162162,-1.110322581,-0.960540541,-2.315483871,-2.402972973,-1.184193548,-2.031891892,-1.110322581,-0.960540541,-2.42,1.033243243,-1.261290323,-0.318108108,-1.939032258,0.794864865,-2.42,1.033243243,2.377419355,0.457027027,2.385483871,0.903243243,2.377419355,0.457027027,2.377419355,0.457027027,2.816451613,-2.217567568,2.816451613,-2.217567568,2.455483871,-1.091081081,2.09483871,-0.768108108],
  [0,0]
];
let pupilCoords = [
  [-1.622258065,-0.78972973,-1.622258065,-0.78972973,-2.18,-1.211351351,-2.273225806,-0.843513514,-2.366129032,-0.475405405,-1.611935484,-0.260810811,-1.229677419,-0.467837838,-0.847419355,-0.674864865,-1.095483871,-1.035135135,-1.580967742,-1.081081081,-2.066451613,-1.127027027,-2.128387097,-0.78972973,-2.004516129,-0.682432432,-1.880645161,-0.575135135,-1.281290323,-0.375945946,-1.229677419,-0.782162162,-1.178064516,-1.188378378,-1.55,-1.372432432,-1.839354839,-1.288108108,-2.128387097,-1.203783784,-2.779354839,-1.073513514,-2.376451613,-0.345135135,-1.973548387,0.382972973,-1.353548387,-0.122972973,-1.198709677,-0.237837838,-1.043870968,-0.352972973,-0.423870968,-0.659459459,-1.105806452,-1.05027027]
];
let noseCoords  = [
  [-2.138709677,0.336481482,-2.354081081,0.971419359,-2.569452704,1.606357235,-1.920774193,2.102672876,0.022972973,3.085945946,-1.315675676,2.929032258,-0.089864865,3.751451613,0.387837838,0.320967742,0.057297297,0.521290323,-0.656486486,1.268823529,-1.964756757,1.933870968,-1.245945946,1.644193548,-0.704864865,2.661290323,0.157162162,0.68516129,0.759459459,1.028064516,-0.271351351,1.607741935],
  [0.366451613,-0.593243243,0.366451613,-0.593243243,-0.363225806,-0.132702703,-0.327096774,0.169189189,-0.291290323,0.471081081,-0.12,0.72027027,0.10516129,0.878918919,0.330645161,1.037297297,1.510967742,1.369459459,1.691290323,1.588378378,1.871290323,1.807567568,2.38483871,2.434054054,2.321935484,2.660540541,2.258709677,2.887027027,1.799354839,3.407837838,1.051290323,3.558918919,0.303548387,3.71,-1.192258065,4.117567568,-1.831935484,3.823243243,-2.471612903,3.528648649,-3.181935484,2.250540541,-1.46,1.798108108,-0.482580645,1.541081081,1.087096774,1.822702703,1.303870968,2.184864865,1.519354839,2.545675676,0.585806452,3.189189189,-0.068709677,3.075405405,-0.504516129,3,-1.876129032,3.185135135,-1.488709677,2.626486486,-1.101290323,2.067837838,-0.479354839,2.482702703,-0.38,2.512972973],
  [0.191290323,-0.439189189,0.191290323,-0.439189189,0.140967742,-0.44972973,0.128387097,-0.344594595,0.115806452,-0.239459459,0.48,1.905945946,0.567741935,2.242432432,0.655806452,2.578918919,1.232903226,4.240540541,1.220322581,4.419459459,1.208064516,4.598108108,1.007096774,4.482432432,1.007096774,4.524594595,1.007096774,4.566486486,0.542580645,1.495945946,0.542580645,1.274864865,0.542580645,1.054054054,0.994516129,1.737837838,1.358387097,1.905945946,1.722580645,2.074324324,-0.486451613,2.337027027,-0.838064516,2.421351351,-1.189354839,2.505405405,-1.302580645,2.358108108,-1.452903226,2.368648649,-1.603548387,2.379189189,-1.766774194,2.484324324,-1.766774194,2.484324324],
];
let mouthCoords = [
  [-2.46,-0.39,-2.4044,-0.496,-2.22,-0.63,-2.0356,-0.764,-1.2382,-1.05,-0.54,-1.11,0.1582,-1.171,1.0596,-1.096,1.38,-0.87,1.7004,-0.645,2.1272,-0.168,1.86,0.09,1.5928,0.348,1.3967,0.535,0.9,0.57,0.4033,0.605,-0.0427,0.684,-0.54,0.57,-1.0373,0.455,-1.2615,-0.014,-1.26,-0.15,-1.2585,-0.286,-1.0272,-0.767,-0.3,-0.87,0.4272,-0.974,1.1736,-0.951,1.38,-0.63,2.0449,0.403,1.8195,0.818,1.419,0.986,1.0185,1.153,0.2036,1.136,-0.3,1.29,-0.8679,1.463,-0.7558,1.463,-0.78,1.5300000],
  [2.620967742,-0.695675676,2.342903226,-0.852972973,2.192903226,-1.041621622,2.042580645,-1.230540541,1.76483871,-1.375135135,1.719677419,-1.40027027,1.674516129,-1.425675676,1.389032258,-1.035405405,1.201290323,-0.915945946,1.013548387,-0.796216216,0.292580645,-0.261351351,0.16483871,-0.305405405,0.037419355,-0.349459459,-0.803870968,-1.35,-1.104193548,-1.356216216,-1.40483871,-1.362702703,-2.651612903,-0.311891892,-2.689032258,-0.185945946,-2.726774194,-0.06,2.448064516,0.336486486,2.666129032,0.267297297,2.883870968,0.197837838,2.358064516,0.128648649,2.200322581,0.141351351,2.042580645,0.153783784,-0.067741935,0.273513514,-1.074193548,0.128648649,-2.080645161,-0.015945946,-2.523870968,0.424594595,-2.531290323,0.518918919,-2.538709677,0.613243243,-0.939032258,1.034864865,-0.037741935,1.17972973,0.863548387,1.324324324,1.952580645,1.343243243,2.388064516,1.223783784,2.823548387,1.104054054,2.620967742,1.154324324,2.620967742,1.154324324],
  [2.763870968,-0.344594595,2.561290323,-1.175135135,2.065483871,-1.168918919,1.569677419,-1.162432432,0.720967742,-1.521081081,-0.382903226,-1.301081081,-1.487096774,-1.080810811,-2.613548387,-0.822702703,-2.636129032,-0.256486486,-2.658709677,0.31,-2.290645161,0.838648649,-1.772258065,1.146756757,-1.254193548,1.455135135,1.457096774,1.014864865,1.892903226,1.058648649,2.328387097,1.102702703,1.314516129,-1.571621622,1.314516129,-1.571621622,1.314516129,-1.571621622,2.163225806,0.630810811,1.892903226,0.901351351,1.622258065,1.172162162,0.646129032,1.159459459,0.563548387,1.109189189,0.480645161,1.058648649,0.022580645,-1.288378378,0.04516129,-1.546486486,0.067741935,-1.804324324,0.345483871,0.083513514,0.353225806,0.549189189,0.360645161,1.014864865,0.187741935,1.26027027,-0.420645161,1.165675676,-1.028709677,1.071351351,-1.336774194,-0.885675676,-1.419354839,-1.206486486,-1.501935484,-1.527567568,-0.968709677,-0.124324324,-1.066451613,0.026756757,-1.164193548,0.177837838,-2.388387097,0.64972973,-2.448387097,0.549189189,-2.508387097,0.448378378,-0.473225806,0.114864865,-0.037419355,0.102162162,0.398064516,0.08972973,1.862580645,0.039459459,2.065483871,0.08972973,2.268387097,0.14,2.658709677,0.165135135,2.658709677,0.165135135],
  [19.108,6.495,18.48,3.422,16.943,3.445,15.406,3.469,12.775,2.142,9.353,2.956,5.93,3.771,2.438,4.726,2.368,6.821,2.298,8.917,3.439,10.873,5.046,12.013,6.652,13.154,15.057,11.525,16.408,11.687,17.758,11.85,14.615,1.955,14.615,1.955,14.615,1.955,17.246,10.104,16.408,11.105,15.569,12.107,12.543,12.06,12.287,11.874,12.03,11.687,10.61,3.003,10.68,2.048,10.75,1.094,11.611,8.079,11.635,9.802,11.658,11.525,11.122,12.433,9.236,12.083,7.351,11.734,6.396,4.493,6.14,3.306,5.884,2.118,7.537,7.31,7.234,7.869,6.931,8.428,3.136,10.174,2.95,9.802,2.764,9.429,9.073,8.195,10.424,8.148,11.774,8.102,16.314,7.916,16.943,8.102,17.572,8.288,18.782,8.381,18.782,8.381],
];
let bezierJoin  = 0;
let coords;

// example of a global function
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

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    // console.log()
    // head
    ellipseMode(CENTER);
    stroke(stroke_color);
    fill(this.mainColour);
    // ellipse(segment_average(positions.chin)[0], 0, 3, 4);
    noStroke();


    // mouth
    fill(this.detailColour);
    ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

    // eyebrows
    fill( this.eyebrowColour);
    stroke( this.eyebrowColour);
    strokeWeight(0.08);
    this.draw_segment(positions.left_eyebrow);
    this.draw_segment(positions.right_eyebrow);

    // draw the chin segment using points
    fill(this.chinColour);
    stroke(this.chinColour);
    this.draw_segment(positions.chin);

    fill(100, 0, 100);
    stroke(100, 0, 100);
    this.draw_segment(positions.nose_bridge);
    this.draw_segment(positions.nose_tip);

    strokeWeight(0.03);

    fill(this.lipColour);
    stroke(this.lipColour);
    this.draw_segment(positions.top_lip);
    this.draw_segment(positions.bottom_lip);

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    let nose_cent_pos = segment_average(positions.nose_bridge);
    let mouth_pos = (segment_average(positions.top_lip)  +   segment_average(positions.bottom_lip)  / 2);



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
    let L_pupilScale  = sPupil/10+0.2;

    DrawShape(coords,   L_pupilTransX,L_pupilTransY,    L_pupilOffsetX,L_pupilOffsetY,    L_pupilScale,1,1,0,0);
    
    //EYE LEFT
    coords  =   eyesCoords[iEye];
    let L_eyeTransX = left_eye_pos[0];
    let L_eyeTransY = left_eye_pos[1];
    let L_eyeOffsetX = 0.5;
    let L_eyeOffsetY = -0.4;
    let L_eyeScale  = 1/4;
    if (iEye==0)  {L_eyeScale  = 1/3}
    // define if the gaps in the beziers should be bridged, as some shapes contain disjointed parts
    if (iEye==6)  {
        bezierJoin = 2;
    } else  {bezierJoin = 0;}

    DrawShape(coords,   L_eyeTransX,L_eyeTransY,    L_eyeOffsetX,L_eyeOffsetY,    L_eyeScale,1,1,0,bezierJoin);

    //PUPIL RIGHT
    coords  =   pupilCoords[0];
    let R_pupilTransX = right_eye_pos[0];
    let R_pupilTransY = right_eye_pos[1]+0.2;
    let R_pupilOffsetX = -1.5;
    let R_pupilOffsetY = -0.2;
    let R_pupilScale  = sPupil/10+0.2;

    DrawShape(coords,   R_pupilTransX,R_pupilTransY,    R_pupilOffsetX,R_pupilOffsetY,    R_pupilScale,1,1,0,0);

    //EYE RIGHT
    coords  =   eyesCoords[iEye];
    let R_eyeTransX = right_eye_pos[0];
    let R_eyeTransY = right_eye_pos[1];
    let R_eyeOffsetX = 0.5;
    let R_eyeOffsetY = -0.4;
    let R_eyeScale  = 1/4;
    if (iEye==0)  {R_eyeScale  = 1/3}
    // define if the gaps in the beziers should be bridged, as some shapes contain disjointed parts
    if (iEye==6) {
        bezierJoin = 2;
    }
    DrawShape(coords,   R_eyeTransX,R_eyeTransY,    R_eyeOffsetX,R_eyeOffsetY,    R_eyeScale,-1,1,0,bezierJoin);

    //NOSE
    coords  =   noseCoords[iNose];
    let noseTransX = nose_cent_pos[0]+0.1;
    let noseTransY = nose_cent_pos[1]-0.3;
    let noseOffsetX = 0.2;
    let noseOffsetY = 0;
    let noseScale  = 1/3;
    let noseScaleX  = -1;
    if (iNose==0){
      noseScaleX  = 1;
    }
 
    DrawShape(coords,   noseTransX,noseTransY,    noseOffsetX,noseOffsetY,    noseScale,noseScaleX,1,0,bezierJoin);   

    //MOUTH
    coords  =   mouthCoords[iMouth];
    let mouthTransX = 1 + mouth_pos;
    let mouthTransY = 0 + mouth_pos;
    let mouthOffsetX = 0;
    let mouthOffsetY = -2.8;
    let mouthScale = 0.4;

    DrawShape(coords,   mouthTransX,mouthTransY,    mouthOffsetX,mouthOffsetY,    mouthScale,1,1,0,bezierJoin);
  }

  // example of a function *inside* the face object.
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

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    return settings;
  }
}

function DrawShape(coords,dotTransX,dotTransY,dotOffsetX,dotOffsetY,shapeScale,shapeScaleX,shapeScaleY,shapeTilt,bezierJoin){
    push();
    stroke('black');
    strokeWeight(0.1);
    fill('black');

    translate(dotTransX, dotTransY);
    scale(shapeScale*shapeScaleX,shapeScale*shapeScaleY);
    // print(coords);
    for (let i=0; i<coords.length; i+=(6+bezierJoin))
    {
        for (let j=0; j<1; j+=1/BrushDetail){
            ellipse(
                //x bezier coords
                bezierPoint(coords[i+0]  -dotOffsetX,    coords[i+2]  -dotOffsetX,    coords[i+4]  -dotOffsetX,    coords[i+6]  -dotOffsetX,    j),
                //y bezier coords
                bezierPoint(coords[i+1]  -dotOffsetY,    coords[i+3]  -dotOffsetY,    coords[i+5]  -dotOffsetY,    coords[i+7]  -dotOffsetY,    j),
                // j/1.7+(PI%i)/100  );
              j/2);
        }
    }
    // ellipse(-4,coords[8],1);
    pop();
}


// function ololodrawface(iEye,sPupil) {
//   let bezierJoin = 0;

//   //stroke parameters
//   stroke('black');
//   strokeWeight(0.1);
//   fill('black');

//   /*
  
//       part-TransX     =   moves the face part after the scale has been applied
//       part-TransY     =   ~
//       part-OffsetX    =   shifts the origin of the body part, useful for shifting where the part scales from
//       part-OffsetY    =   ~
//       part-Scale      =   scales the face part

//   */

//   //EYE LEFT
//   let coords  =   split(eyesCoords[iEye],',');
//   let L_eyeTransX = 0;
//   let L_eyeTransY = 0;
//   let L_eyeOffsetX = 1;
//   let L_eyeOffsetY = 0;
//   let L_eyeScale  = 1;
//   // define if the gaps in the beziers should be bridged, as some shapes contain disjointed parts
//   if (iEye==6) {
//       bezierJoin = 2;
//   }

//   DrawShape(coords,   L_eyeTransX,L_eyeTransY,    L_eyeOffsetX,L_eyeOffsetY,    L_eyeScale,1,1,0,bezierJoin);

//   //PUPIL LEFT
//   coords  =   split(pupilCoords[0],',');
//   let L_pupilTransX = -0.7;
//   let L_pupilTransY = 0.7;
//   let L_pupilOffsetX = -1.5;
//   let L_pupilOffsetY = -0.2;
//   let L_pupilScale  = sPupil/100+0.5;

//   DrawShape(coords,   L_pupilTransX,L_pupilTransY,    L_pupilOffsetX,L_pupilOffsetY,    L_pupilScale,1,1,0,0);

//   //EYE RIGHT
//   coords  =   split(eyesCoords[iEye],',');
//   let R_eyeTransX = 3;
//   let R_eyeTransY = 0;
//   let R_eyeOffsetX = 0;
//   let R_eyeOffsetY = 0;
//   let R_eyeScale  = 1;
//   let R_eyeScaleX  = -1;
//   let R_eyeScaleY  = 1;
//   let R_eyeTilt  = 0;
//   // define if the gaps in the beziers should be bridged, as some shapes contain disjointed parts
//   if (iEye==6) {
//       bezierJoin = 2;
//   }

//   DrawShape(coords,   R_eyeTransX,R_eyeTransY,    R_eyeOffsetX,R_eyeOffsetY,    R_eyeScale,R_eyeScaleX,R_eyeScaleY,   R_eyeTilt ,bezierJoin);

//   //PUPIL RIGHT
//   coords  =   split(pupilCoords[0],',');
//   let R_pupilTransX = 3;
//   let R_pupilTransY = 0;
//   let R_pupilOffsetX = -1.5;
//   let R_pupilOffsetY = -0.5;
//   let R_pupilScale  = sPupil/100+0.4;

//   DrawShape(coords,   R_pupilTransX,R_pupilTransY,    R_pupilOffsetX,R_pupilOffsetY,    R_pupilScale,1,1,0,0);

//   //NOSE
//   coords  =   split(noseCoords[iNose],',');
//   let noseTransX = 1;
//   let noseTransY = 1;
//   let noseOffsetX = 0;
//   let noseOffsetY = 0;
//   let noseScale  = 1;

//   DrawShape(coords,   noseTransX,noseTransY,    noseOffsetX,noseOffsetY,    noseScale,1,1,0,bezierJoin);   

//   //MOUTH
//   coords  =   split(mouthCoords[iMouth],',');
//   let mouthTransX = 1;
//   let mouthTransY = 6;
//   let mouthOffsetX = 0;
//   let mouthOffsetY = 0;
//   let mouthScale = 1;

//   DrawShape(coords,   mouthTransX,mouthTransY,    mouthOffsetX,mouthOffsetY,    mouthScale,1,1,0,bezierJoin);
// }