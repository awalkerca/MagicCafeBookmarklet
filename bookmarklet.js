(function(){
    var v = '1.3.2';
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v){
        var done = false;
        var script = document.createElement('script');
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v +
            '/jquery.min.js';
        script.onload = script.onreadystatechange = function(){
            if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')){
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet(){
        (window.myBookmarklet = function(){

            var header = $('body > table'),
                sectionsContainer = $('table + table table tbody'),
                sectionTitlesToDisplay = [
                    'New to magic?',
                    'The workers',
                    'Deckless!',
                    'Gaffed & Funky',
                    'Nothing up my sleeve...',
                    'Trick coin trickery',
                    'Paper money madness!',
                    'Rings, strings & things',
                    'Table hoppers & party strollers',
                    'Latest and Greatest?',
                    'Tricks & effects for sale or trade',
                    'DVD & Video tapes for sale or trade...',
                    'Books & lecture notes for sale or trade...',
                    'The Wizard Product Review by Craig Petty & David Penn',
                    'Magic Friday by Jamie D. Grant',
                    'Tricks & Effects',
                    'Books, Pamphlets & Lecture Notes',
                    'Dvd, Video tape, Audio tape & Compact discs.',
                    'Ebooks, PDF\'s or Downloads',
                    'The triple dare!',
                    'Secret sessions'
                ];

            sectionsContainer.find('tr').hide();

            $.each(sectionTitlesToDisplay, function(i,section){
                $(':contains(' + section + ')').parents('tr').show();
            });
        }());
    }
}());