// tests go here; this will not be compiled when this package is used as a library
game.onUpdate(function () {
    light.showAnimationFromImage(img`
        3 3 8 a a
        5 3 3 8 a
        5 5 3 3 8
        7 5 5 3 3
        7 7 5 5 3
    `, 500)
})
