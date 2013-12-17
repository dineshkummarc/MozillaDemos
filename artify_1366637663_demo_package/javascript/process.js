function euclideanDistance (x, y, xq, yq){
    return Math.sqrt ( (x-xq)*(x-xq) + (y-yq)*(y-yq));
}

function differenceInIntensity (loc, cur_loc, binaryData){
    var I_loc = (binaryData[loc] + binaryData[loc+1] + binaryData[loc+2])/255/3;
    var I_cur_loc = (binaryData[cur_loc] + binaryData[cur_loc+1] + binaryData[cur_loc+2])/255/3;
    return Math.abs(I_loc - I_cur_loc);
}

function gaussianKernal ( mew, x ) {
    var y = ( 1/ (2*Math.PI*(mew*mew)));
    var z = Math.exp ( -1* (x*x) / (2*(mew*mew))); 
    return y*z;
}
var processImage = function ( width, height, binaryData, startAt, endAt) {
    
    /* Bilateral filter algorithm   
    */
    var mew_s = 3; 
    var mew_r = 0.2;
    var GC_I = [];
    for (var x = 0; x < width; x++){
        for (var y = startAt; y < endAt; y++){
            var loc = (x + y*width) * 4;

            var sum_kernal = 0;
            GC_I[loc]=0;
            GC_I[loc+1]=0;
            GC_I[loc+2]=0;
            GC_I[loc+3]=binaryData[loc+3];

            var x_max = Math.min(width, x+2*mew_s);
            var y_max = Math.min(height, y+2*mew_s);
            var x_min = Math.max(0, x-2*mew_s);
            var y_min = Math.max(0, y-2*mew_s);

            for (var xq=x_min; xq < x_max; xq++) {
                for (var yq=y_min; yq < y_max; yq++) {

                    var cur_loc = (xq+yq*width)*4;

                    var dist = euclideanDistance(x, y, xq, yq);
                    var kernal_s = gaussianKernal(mew_s, dist);
                    var diff_intensity = differenceInIntensity(loc, cur_loc, binaryData);
                    var kernal_r = gaussianKernal(mew_r, diff_intensity);

                    sum_kernal += kernal_s*kernal_r;
                    
                    GC_I[loc]+=kernal_s*kernal_r*binaryData[cur_loc];
                    GC_I[loc+1]+=kernal_s*kernal_r*binaryData[cur_loc+1];
                    GC_I[loc+2]+=kernal_s*kernal_r*binaryData[cur_loc+2];
                }   
            }   
            GC_I[loc] = GC_I[loc] / sum_kernal;
            GC_I[loc+1] = GC_I[loc+1] / sum_kernal;
            GC_I[loc+2] = GC_I[loc+2] / sum_kernal;
         
            /* Increase the saturation
            linear interpolation using the pixel and the luminance pixel
            alpha values:
                0 - takes lumiance image
                0.5 reduce colour saturation by half
                1 - no change
                2 - double saturdation
            */
            var luminance = GC_I[loc]*0.299 + GC_I[loc+1]* 0.587 + GC_I[loc+2]*0.114;
            var alpha = 2.5;
            GC_I[loc] = alpha*GC_I[loc] + (1-alpha)*luminance;
            GC_I[loc+1] = alpha*GC_I[loc+1] + (1-alpha)*luminance;
            GC_I[loc+2] = alpha*GC_I[loc+2] + (1-alpha)*luminance;
               
        }
    }

    for (var x = 0; x < width; x++){
        for (var y = startAt; y < endAt; y++){
            var loc = (x + y*width) * 4;
            binaryData[loc] = GC_I[loc];
            binaryData[loc+1] = GC_I[loc+1];
            binaryData[loc+2] = GC_I[loc+2];
            binaryData[loc+3] = GC_I[loc+3];
        }
    }

};





















