function clone(point) { //TODO: use gl-vec2 for this
    return [point[0], point[1]]
}

function vec2(x, y) {
    return [x, y]
}

module.exports = function createQuadraticBuilder(opt) {
    opt = opt||{}

    var RECURSION_LIMIT = typeof opt.recursion === 'number' ? opt.recursion : 8
    var FLT_EPSILON = typeof opt.epsilon === 'number' ? opt.epsilon : 1.19209290e-7
    var PATH_DISTANCE_EPSILON = typeof opt.pathEpsilon === 'number' ? opt.pathEpsilon : 1.0

    var curve_angle_tolerance_epsilon = typeof opt.angleEpsilon === 'number' ? opt.angleEpsilon : 0.01
    var m_angle_tolerance = opt.angleTolerance || 0

    return function quadraticCurve(start, c1, end, scale, points) {
        if (!points)
            points = []

        scale = typeof scale === 'number' ? scale : 1.0
        var distanceTolerance = PATH_DISTANCE_EPSILON / scale
        distanceTolerance *= distanceTolerance
        begin(start, c1, end, points, distanceTolerance)
        return points
    }

    ////// Based on:
    ////// https://github.com/pelson/antigrain/blob/master/agg-2.4/src/agg_curves.cpp

    function begin(start, c1, end, points, distanceTolerance) {
        points.push(clone(start))
        var x1 = start[0],
            y1 = start[1],
            x2 = c1[0],
            y2 = c1[1],
            x3 = end[0],
            y3 = end[1]
        recursive(x1, y1, x2, y2, x3, y3, points, distanceTolerance, 0)
        points.push(clone(end))
    }



    function recursive(x1, y1, x2, y2, x3, y3, points, distanceTolerance, level) {
        if(level > RECURSION_LIMIT) 
            return

        var pi = Math.PI

        // Calculate all the mid-points of the line segments
        //----------------------
        var x12   = (x1 + x2) / 2                
        var y12   = (y1 + y2) / 2
        var x23   = (x2 + x3) / 2
        var y23   = (y2 + y3) / 2
        var x123  = (x12 + x23) / 2
        var y123  = (y12 + y23) / 2

        var dx = x3-x1
        var dy = y3-y1
        var d = Math.abs(((x2 - x3) * dy - (y2 - y3) * dx))

        if(d > FLT_EPSILON)
        { 
            // Regular care
            //-----------------
            if(d * d <= distanceTolerance * (dx*dx + dy*dy))
            {
                // If the curvature doesn't exceed the distance_tolerance value
                // we tend to finish subdivisions.
                //----------------------
                if(m_angle_tolerance < curve_angle_tolerance_epsilon)
                {
                    points.push(vec2(x123, y123))
                    return
                }

                // Angle & Cusp Condition
                //----------------------
                var da = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1))
                if(da >= pi) da = 2*pi - da

                if(da < m_angle_tolerance)
                {
                    // Finally we can stop the recursion
                    //----------------------
                    points.push(vec2(x123, y123))
                    return                 
                }
            }
        }
        else
        {
            // Collinear case
            //-----------------
            dx = x123 - (x1 + x3) / 2
            dy = y123 - (y1 + y3) / 2
            if(dx*dx + dy*dy <= distanceTolerance)
            {
                points.push(vec2(x123, y123))
                return
            }
        }

        // Continue subdivision
        //----------------------
        recursive(x1, y1, x12, y12, x123, y123, points, distanceTolerance, level + 1) 
        recursive(x123, y123, x23, y23, x3, y3, points, distanceTolerance, level + 1) 
    }
}