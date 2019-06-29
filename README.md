# light-image

Animate light strip using an image; where every column is an animation frame.

## Examples

Display a gradient in a loop.

```blocks
game.onUpdate(function () {
    light.showAnimationFromImage(img`
        3 3 8 a a
        5 3 3 8 a
        5 5 3 3 8
        7 5 5 3 3
        7 7 5 5 3
    `, 500)
})
```

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)
