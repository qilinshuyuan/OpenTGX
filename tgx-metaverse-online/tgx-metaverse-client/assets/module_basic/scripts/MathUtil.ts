export class MathUtil {

    static limit(src: number, min: number, max: number) {
        return Math.min(max, Math.max(min, src));
    }

}