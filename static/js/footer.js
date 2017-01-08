/* load new page inline -- see pagination.html for elements */
/* we only have two dynamic elements, so we can just replace those with the next page */

$('footer').on('click', '.motd-link', function (event) {
    event.preventDefault();
    
    link_destination = $(this).attr('href');
    
    /* $('#motd-buttons').load(link_destination + ' #motd-buttons > *'); */
    
    /* fade content out and back in as a transition */
    $('#main-content').fadeOut(200, function() {
        /* old-style method -- load main content children -- scripts are filtered out */
        /*$('#main-content').load(link_destination + ' #main-content > *', function() {
            $('#main-content').fadeIn(200);
        });*/
        
        /* use a single request to get both navigation buttons and content */
        $.get(link_destination, function (data) {
            /* load buttons */
            $('#motd-buttons').replaceWith( $(data).find('#motd-buttons') );
            
            /* load content including inline scripts */
            $('#main-content').empty()
                    .append( $(data).closest('#main-content').children() );
            $('#main-content').fadeIn(200);
        });
    });
    
    /* update address bar, for the people sneaking around */
    window.history.replaceState(0, "wew", link_destination);
});