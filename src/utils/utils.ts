import { COLORS } from "config/Colors";

export function hexToRgb(hex: string | undefined) {
    if (hex !== undefined) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            var r = parseInt(result[1], 16);
            var g = parseInt(result[2], 16);
            var b = parseInt(result[3], 16);
            return 'rgba(' + r + "," + g + "," + b + ', 0.3)';
        }
    }
    return COLORS.background;
}