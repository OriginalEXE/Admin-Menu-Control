module.exports = function(grunt){
	
	// Initializing configuration objects
	grunt.initConfig({
	
		// Reading 'package.json' so that we can use setting given there
		pkg : grunt.file.readJSON( 'package.json' ),

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'admin/css/admin-plugin-page.css': 'admin/css/admin-plugin-page.sass'
				}
			}
		},

		watch: {
			css: {
				files: '**/*.sass',
				tasks: ['sass']
			}
		}

	});
	
	// Loading the packages.
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-text-replace' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	
	// Registering default tasks
	grunt.registerTask( 'default', [ 'watch' ] );
}