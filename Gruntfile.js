module.exports = function(grunt) {

grunt.initConfig({
		watch: {
		  scripts: {
		    files: ['README.md'],
		    tasks: ['shell'],
		    options: {
		      spawn: false,
		    },
		  },
		},
    shell: {
        options: {
            stderr: false
        },
        target: {
            command: function(){
            	var fmStart = "---";
							var fmLayout = "layout: default";
							var fmTitle = "title: Readme";
							var fmLink =  "permalink: /";
							var fmEnd =  "---";
            	return [
            		'rm INDEX.md',
            		'touch INDEX.md',
            		'echo '+fmStart+' >> INDEX.md',
								'echo '+fmLayout+' >> INDEX.md',
								'echo '+fmTitle+' >> INDEX.md',
								'echo '+fmLink+' >> INDEX.md',
								'echo '+fmEnd+' >> INDEX.md',
								'cat README.md >> INDEX.md',
							].join('&&')
            }
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('default', ['shell']);
grunt.registerTask('dev', ['watch']);
}