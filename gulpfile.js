const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
function compile(inputPath,outputPath="CMUI/style"){
    gulp.src(inputPath)
        .pipe( sourcemaps.init() )
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe( postcss([require('autoprefixer') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe(gulp.dest(outputPath));
}
gulp.task("sass",async() =>{
    //copy font
    gulp.src("src/cyan/font/*")
        .pipe(gulp.dest("dist/font"));
    //compile sass
    compile("src/cyan/CMUI.scss");
    compile("src/cyan/cmuiMobile.scss");
    compile("src/cyan/cmuiPC.scss");
    compile("src/cyan/cmuiAnimate.scss");
});
gulp.task("theme",async() =>{
    compile("src/maple/theme.scss");
});
