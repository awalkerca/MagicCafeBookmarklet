(function(){
    "use strict";
    var v = '1.3.2';
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v){
        var done = false;
        var script = document.createElement('script');
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v +
            '/jquery.min.js';
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }
    var sectionLink = 'viewforum.php?forum=';

    var storage = (function(){
        localStorage.name = 'magicCafeHelper';
        return {
            save: function save(val){
                localStorage.setItem('selectedVals',val);
            },
            load: function load(){
                return localStorage.getItem('selectedVals');
            },
            reset: function reset(){
                localStorage.clear();
            },
            hasStoredValues: function hasStoredValues(){
                return storage.load() !== null;
            }
        }
    }());

    var getSectionsToDisplay = function getSectionsToDisplay(){
        var selectedSections = [];
        $('.allSections :checked').each(function(i,section){
            selectedSections.push($(section).val());
        });
        return selectedSections;

    };
    var getAllSections = function getAllSections(){
        var sections = [];
        $('td a[href^="' + sectionLink + '"]').each(function(i,section){
            sections.push($(section).text());
        });
        return sections;
    };

    var resetSettings = function resetSettings(evt){
        evt.preventDefault();
        evt.stopPropagation();
        storage.reset();
        $('.allSections :checked').each(function(i,section){
           $(section).click();
        });
        window.location.reload();
    };
    var updateView = function updateView(evt){
        var header = $('body > table'),
            footer = $('body > table:last'),
            sectionsContainer = $('table + table table tbody'),
            sectionTitlesToDisplay = getSectionsToDisplay();
        sectionsContainer.find('tr').addClass('cafeHelperHidden');
        $.each(sectionTitlesToDisplay, function(i,section){
            $('a[href^="' + sectionLink + '"]:contains(' + section + ')').parents('tr').removeClass('cafeHelperHidden').addClass('cafeHelperVisible');

        });
        footer.find('tr').addClass('cafeHelperVisible');
        storage.save(sectionTitlesToDisplay.join("|^|"));
        evt.preventDefault();
        evt.stopPropagation();
    };

    var buildIdFromName = function buildIdFromName(name){return name.toLowerCase().replace(/\s/g,'');};

    var renderPanel = function renderPanel(){
        var panel = $('<div id=cafeBookmarkletHelper ></div>'),
            header = $('<h2>CafeHelper</h2>'),
            body = $('<div class=helperBody></div>'),
            buttonBar = $('<div class="buttonBar"></div>'),
            sectionList = $('<ul class=allSections></ul>'),
            allSections = getAllSections(),
            resetButton = $('<input type="button" id="cafeHelperReset" value="Reset" />'),
            runButton = $('<input type="button" id="cafeHelperfixIt" value="Fix It!" />');
        addStyles();
        resetButton.click(resetSettings);
        runButton.click(updateView);
        header.click(function(){$('#cafeBookmarkletHelper .helperBody').slideToggle('fast');});
        $.each(allSections,function(i,section){
            var line = $('<li><input type=checkbox value="' +
                section +
                '" id=' +
                buildIdFromName(section) +
                '></input><label for="' +
                buildIdFromName(section) +
                '">' +
                section +
                '</label></li>');
            sectionList.append(line);
        });
        panel.append(header);
        buttonBar.append(runButton);
        buttonBar.append(resetButton);
        body.append(buttonBar);
        body.append(sectionList);
        panel.append(body);
        $('body').append(panel);
        if(storage.hasStoredValues()){
            hidePanel();
            processSavedValues();
        }else{
            showPanel();
        }
    };

    var processSavedValues = function processSavedValues(){
        var savedVals = storage.load().split("|^|");
        $.each(savedVals, function(i,savedVal){
            $('.allSections input[value=' + savedVal + ']').click();
        });
        $('#cafeBookmarkletHelper #cafeHelperfixIt').click();

    };

    var hidePanel = function hidePanel(){
        $('#cafeBookmarkletHelper .helperBody').hide();
    };

    var showPanel = function showPanel(){
        $('#cafeBookmarkletHelper .helperBody').slideDown();
    };

    var addStyles = function addStyles(){
        var link = $('<link />');
        link.attr('href', path + 'bookmarklet.cafehelper.css').attr('media','screen').attr('rel','stylesheet').attr('type','text/css');
        $('head').append(link);
    };
    var path = '';
    var initMyBookmarklet = function initMyBookmarklet(){
        (window.myBookmarklet = function(){
            path = $("#magicCafeBookmarkletScript").data('path') || '';
            renderPanel();
        }());
    }
}());