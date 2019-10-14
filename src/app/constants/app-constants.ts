export class AppConstants{
    public static FORM_REGEX_VALIDATOR = {
        ALPHA: '^[a-zA-Z]+$',
        NUMERIC: '^[0-9]*$',
        ALPHA_NUMERIC: '^[^s][a-zA-Z0-9 ]*$',
        ALPHA_NUMERIC_DASH: '[a-zA-Z0-9- ]*$',
        ALPHA_NUMERIC_DASH_NO_SPACE: '[a-zA-Z0-9-]*$',
    }
}