var adaptive = require('../')

require('canvas-testbed')(function(ctx, width, height) {
    var scale = 2
    var path = adaptive([20, 20], [100, 159], [30, 100], scale)
    
    ctx.save()
    ctx.scale(scale, scale)

    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.quadraticCurveTo(100,159, 30,100)
    ctx.lineWidth = 4
    ctx.strokeStyle = 'red'
    ctx.stroke()

    ctx.strokeStyle = '#000'
    path.forEach(function(p) {
        var r = 3
        ctx.fillRect(p[0]-r/2,p[1]-r/2, r, r)
    })
    ctx.restore()
})