namespace light {
    //% blockId=lightimagepicker block="%img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% weight=100 group="Create" duplicateShadowOnDrag
    //% blockHidden=1
    //% img.fieldOptions.sizes="5,5;5,10;30,30;30,60;5,15;10,30;30,90"
    export function _lightImage(img: Image) {
        return img
    }

    /**
     * A light animation that uses an image to determine the colors.
     * The animation renders each column of the image on the image strip;
     */
    export class ImageAnimation extends NeoPixelAnimation {
        constructor(public image: Image) {
            super();
        }

        public createRenderer(strip: NeoPixelStrip): () => boolean {
            const n = strip.length();
            const img = this.image;
            const w = img.width;
            const h = img.height;

            let x = 0;
            return () => {
                for (let i = 0; i < n; i++) {
                    const y = i * h / (n - 1);
                    const ly = Math.floor(y);
                    const ly1 = (ly + 1) % h;
                    const dy = y - ly;
                    const ody = 1 - dy;

                    // compute interpolated color
                    let c = ody * img.getPixel(x, ly) + dy * img.getPixel(x, ly1);

                    strip.setPixelColor(i, c);
                }
                if (++x >= w) {
                    x = 0;
                    return false;
                } else return true;
            }
        }
    }

    // assuming we have a single light strip
    let lastAnimationImage: ImageAnimation;

    /**
     * Show an animation or queue an animation in the animation queue from an image
     * @param image the image that contains the animation
     * @param duration the duration to run in milliseconds, eg: 500
     */
    //% blockId=lightshownimationfromimage block="show animation from image %image=lightimagepicker|for %duration=timePicker|ms"
    //% blockGap=8
    //% weight=79
    export function showAnimationFromImage(image: Image, duration: number) {
        lastAnimationImage = lastAnimationImage && lastAnimationImage.image == image ? lastAnimationImage : new ImageAnimation(image);
        light.showAnimation(lastAnimationImage, duration);        
    }

    /**
     * Show an animation or queue an animation in the animation queue from an image
     * @param image the image that contains the animation
     * @param duration the duration to run in milliseconds, eg: 500
     */
    //% blockId=lightshownimationfromimage block="%strip|show animation from image %image=lightimagepicker|for %duration=timePicker|ms"
    //% blockGap=8
    //% weight=79
    //% advanced
    export function showAnimationFromImageOnStrip(strip: NeoPixelStrip, image: Image, duration: number) {
        // keep track 
        lastAnimationImage = lastAnimationImage && lastAnimationImage.image == image ? lastAnimationImage : new ImageAnimation(image);    
        strip.showAnimation(lastAnimationImage, duration);
    }
    
}