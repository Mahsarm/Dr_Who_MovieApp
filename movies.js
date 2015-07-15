
// full api documentation link : http://docs.themoviedb.apiary.io/

        var Movie_app = {};
        
        Movie_app.api_key = '91a4ae1fc071d863ca675c635bd838ef';
        
        Movie_app.init = function() {
            Movie_app.get_config();
            };
 
        
        Movie_app.get_config = function() {
            
            var config_url = 'https://api.themoviedb.org/3/configuration';
            
            $.ajax(config_url, {
                
                type : 'GET', 
                dataType : 'jsonp',
                data : {
                    api_key: Movie_app.api_key
                },
                success : function(config) {
                
                    Movie_app.config = config;
                    Movie_app.get_title();
                    Movie_app.get_OldSeries();
                    Movie_app.get_NewSeries();
                    console.log(config);
                }       
                
            }); // end of configuration ajax            
        }; // end of get_config
        
        
        Movie_app.get_title = function() {
            
            var title_url =  'http://api.themoviedb.org/3/tv/57243';
            $.ajax(title_url, {
                
                type : 'GET', 
                dataType : 'jsonp',
                data : {
                    api_key: Movie_app.api_key
                },
                success : function(description) {
                    
                    var dr_description =  $('<h2>').text(description.overview);
                    var title = $('<div>').addClass('title').append(dr_description);
                    
                    $('.dr_who').append(title);
                    
                    console.log(title);   
                    
                }
        }
        )}
        
        
        Movie_app.get_OldSeries = function() {
            
            var old_url =  'http://api.themoviedb.org/3/tv/121/credits';
            $.ajax(old_url, {
                
                type : 'GET', 
                dataType : 'jsonp',
                data : {
                    api_key: Movie_app.api_key
                },
                success : function(old_drs) {
                    
                    Movie_app.OldSeries = old_drs; 
                    console.log(old_drs);
                    for (var i = 1; i < old_drs.cast.length; i++) {
                        
                    var name =  $('<h3>').text(old_drs.cast[i].name);
                    var image = $('<img>').attr('src', Movie_app.config.images.base_url + 'w185' + old_drs.cast[i].profile_path);
                    var movie = $('<div>').addClass('movie').append(name,image);
                    
                    $('.OldDoctors_div').append(movie);

                    } // end of if   
                }       
            
            }); // end of get_OldSeries ajax    
        }; // end of  get_OldSeries
        
        
        Movie_app.get_NewSeries = function() {
            
         for (var i = 1; i < 9; i++){
                
                var result = {};
                          
                api_key = '91a4ae1fc071d863ca675c635bd838ef';
 
                var new_url =  'http://api.themoviedb.org/3/tv/57243/season/' + i + '/credits' ;
                             
                $.ajax(new_url, {
                    
                    type : 'GET', 
                    dataType : 'jsonp',
                    data : {
                        api_key: api_key
                    },
                    success : function(new_drs) {
                        
                        for (var j = 0; j < new_drs.cast.length; j++) {
                            
                        
                            if (new_drs.cast[j].character === "The Doctor") {
                                
                                var dr = new_drs.cast[j];
                                
                                if(!result[dr.credit_id]){   
                                
                                    result[dr.credit_id]= dr.name;
                                    
                                    var name = $('<h3>').text(dr.name);
                                    var pic = dr.profile_path;  
                                    var image = $('<img>').attr('src', Movie_app.config.images.base_url + 'w185' + pic);
                                    var movie = $('<div>').addClass('movie').append(name,image);
                                    $('.NewDoctors_div').append(movie);
                                       
                                } // end of second if                              
                            } // end of fist if

                        } // end of for j
                        
                        
                    } 

                    });

                        
            }   // end of for i     
            
        }   
                
        
        
        
    $(function(){
        Movie_app.init();
        

    }); // end doc ready
        
        
        
        