

var game = (function(window, document, undefined){
    var displayElements = {
        help : $('#help'),
        turn : $('#turn'),
        card : $('#card'),
        welcomeScreen :  $('#welcome_screen'),
        setUp : $('#set_up'),
        gameComponents : $('#game_components'),
        helpButton : $('#help_button'),
        gameButtons : $('#game_buttons'),
        currentGame : $('#current_came')
    },
    
    //deck;
    turn_counter = 0;
    //number_of_players;
    //players;
    //rule_set;
    kings = 0;
    game = false;   

    
    function hideElems(elems){
        for(var i = 0; i < elems.len; i++){
             var elem = elems[i];
             function hide(){
                 elem.hide();
             }
        }
    }
    
    function showElems(elems){
        for(var i = 0; i < elems.len; i++){
             var elem = elems[i];
             function show(){
                 elem.show();
             }
        }
    }  
    
    function emptyElems(elems){
        for(var i = 0; i < elems.len; i++){
             var elem = elems[i];
             function empty(){
                 elem.empty();
             }
        }
    }  
    
    
    hideElems(displayElements.help,
            displayElements.currentGame,
            displayElements.setUp);
    
    function start(){
        hideElems(displayElements.welcomeScreen);
        showElems(displayElements.setUp);
        displayElements.append('<input type="text" ' +
                    'class="input_field center" id="num" ' +
                    'value="Number of players">' +
                    '<img alt="setup button" ' + 
                    'class="button center" ' +
                    'onclick="set_players()" ' +
                    'src="static/button_proceed.png">');
    }

    function hide_help(){
        hideElems(displayElements.help);
        showElems(displayElements.gameComponents);
    }

    function show_help(){
        hideElems(displayElements.gameComponents);
        hideElems(displayElements.help);
    }

    function set_players(){
            var number = document.getElementById('num').value;
            number = parseInt(number);
            //Need do something if string is entered.
            number_of_players = number;
            emptyElems(displayElemets.setUp);

            for(i = 0; i < number_of_players; i++){
                var player_number = i + 1;
                displayElems.setUp.append('<input class="input_field center"' + 
                                        ' value="Player #' + 
                                        player_number + '" type="text" id="' + 
                                        i + '" >');
            }
            displayElems.setUp.append('<img alt="proceed button" id="proceed_button" ' +
                        'class="center button" src="static/button_proceed.png"' + 
                        ' onclick=register_players()>');
    }

    function register_players(){
        players = new Array();
        for (i = 0; i < number_of_players; i++){
            players[i] = document.getElementById(i).value;
        }
        set_up_rules();
    }

    function set_up_rules(){
        emptyElems(displayElemets.setUp);
        for (i = 0; i < 12; i++){
            switch(i)
            {
                case 0:
                    name = 'Ace';
                    break;
                case 10:
                    name = 'Jack';
                    break;
                case 11:
                    name = 'Queen';
                    break;
                default:
                    name = 'card ' + (i + 1);
                    break;
            }
            displayElements.setUp.append('<input value="Rule for ' + 
                                        name + '" class="input_field center" id="other' + 
                                        i + '" type="text">');
        }   
            displayElements.setUp.append('<br><img alt="setup button" class="button center"' + 
                    ' src="static/button_startgame.png" ' + 
                    'onclick="set_rules()">');
    }

    function set_rules(){
        rule_set = new Array();
        for (i = 0; i < 12; i++){
            card_rule = document.getElementById('other' + i).value;
            rule_set[i] = card_rule;
        }
        rule_set[12] = 'KINGS CUP!!';
        start_game();
    }

    function start_game(){
        new_deck();
        pull_card();
        hideElems(displayElements.help_button, displayElem.setUp);
        showElems(displayElements.turn, displayElements.currentGame);
        game = true;
    }

    function pull_card(){
        item = Math.random() * deck.length;
        card = deck.splice(item,1);
        display_card(card);
    }

    function display_card(card){
        //weird flash, need to empty content for each card
        game_buttons = '<img class="center button" alt="next card button" ' +
                    'src="static/button_nextcard.png" ' +
                    'onclick="pull_card()" >' +
                    '<img class="center button" alt="remind me of rule button" ' + 
                    'src="static/button_remindme.png" ' + 
                    'onclick="display_rule()" >';

        if(card < 1){
            alert("Deck is empty. The game will reload");
            window.location.reload();
            }

        current_turn = get_current_turn();
        turn = get_next_turn();

        //need to be called to check if it is the last king
        get_rule(card, current_turn);

        //needs to be done to prevent weird flash
        emptyElem(displayElements.game_button, displayElem.card, displayElements.turn);
        displayElements.card.append('<img class="center" alt="' + card + '"src=/static/cards/' + 
                    card + '.png >');
        if (current_turn != undefined){
            displayElements.turn.append('<h2 class="center" >Current player: ' + 
                                        current_turn + '</h2>');
        }

        if (turn != undefined){
            displayElements.turn.append('<h2 class="center">Next player: ' + 
                                        turn + '</h2>'); 
        }

    }

    function get_next_turn(){
        //add test on get number
        if (turn_counter == (players.length - 1)){
            turn_counter = -1;
        }
        turn_counter += 1;
        player = players[turn_counter];
        return player;     
    }

    function get_current_turn(){
        return players[turn_counter];
    }

    function get_rule(card, player){
        num = String(card);
        num = num.substring(1);
        if (num == 13){
            kings +=1;
            if (kings == 4){
                if (player == undefined){
                    alert('LAST KING! Congratulations!');
                }
                else{
                    alert('LAST KING! Congratulations ' + player + '!');
                }
            }
        }
        return rule_set[num - 1];
    }

    function display_rule(){
        rule = get_rule(card, get_current_turn());
        alert(rule);
    }

    function new_deck(){
        var deck = new Array(
                    'd1',
                    'd2',
                    'd3',
                    'd4',
                    'd5',
                    'd6',
                    'd7',
                    'd8',
                    'd9',
                    'd10',
                    'd11',
                    'd12',
                    'd13',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'h7',
                    'h8',
                    'h9',
                    'h10',
                    'h11',
                    'h12',
                    'h13',
                    'c1',
                    'c2',
                    'c3',
                    'c4',
                    'c5',
                    'c6',
                    'c7',
                    'c8',
                    'c9',
                    'c10',
                    'c11',
                    'c12',
                    'c13',
                    's1',
                    's2',
                    's3',
                    's4',
                    's5',
                    's6',
                    's7',
                    's8',
                    's9',
                    's10',
                    's11',
                    's12',
                    's13'
                    );
        deck = deck;    
    }
    
}(window, window.document));