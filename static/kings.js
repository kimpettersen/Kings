window.turn_counter = 0;
window.kings = 0;
window.game = false;

$(document).ready(function(){
    $('#help').hide();
    $('#turn').hide();
    $('#card').hide();
    $('#count').hide();
    $('#rule_text').hide();
    $('#game_buttons').hide();
    $('#set_up').hide();
    
    $(document).keydown(function(e) {
        //Add this to all the inputs
      if (e.keyCode == '32' || e.keyCode == 13) {
        if (game == true){
            pull_card();
        }
      }
    });
});

function start(){
    $('#welcome_screen').hide();
    $('#set_up').show();
    $('#set_up').append('<input type="text" ' +
                'class="input_field center" id="num" ' +
                'value="Number of players">' +
                '<img alt="setup button" ' + 
                'class="button center" ' +
                'onclick="set_players()" ' +
                'src="static/button_proceed.png">');
}

function hide_help(){
    $('#help').hide();
    $('#game_components').show();
}

function show_help(){
    $('#game_components').hide();
    $('#help').show();
}

function set_players(){
        var number = document.getElementById('num').value;
        number = parseInt(number);
        //Need do something if string is entered.
        window.number_of_players = number;
        $('#set_up').empty();
        
        for(i = 0; i < window.number_of_players; i++){
            var player_number = i + 1;
            $('#set_up').append('<input class="input_field center"' + 
                        ' value="Player #' + 
                        player_number + '" type="text" id="' + 
                        i + '" >');
        }
        $('.set_up').append('<img alt="proceed button" id="proceed_button" ' +
                    'class="center button" src="static/button_proceed.png"' + 
                    ' onclick=register_players()>');
}

function register_players(){
    players = new Array();
    for (i = 0; i < window.number_of_players; i++){
        players[i] = document.getElementById(i).value;
    }
    window.players = players;
    set_up_rules();
}

function set_up_rules(){
    $('.set_up').empty();
    for (i = 0; i < 12; i++){
        if (i == 0){
            name = 'Ace';
        }
        else if (i == 10){
            name = 'Jack';
        }
        else if (i == 11){
            name = 'Queen';
        }
        
        else{
            name = 'card ' + (i + 1);
        }
        $('.set_up').append('<input value="Rule for ' + 
                    name + '" class="input_field center" id="other' + 
                    i + '" type="text">');
    }   
    $('.set_up').append('<br><img alt="setup button" class="button center"' + 
                ' src="static/button_startgame.png" ' + 
                'onclick="set_rules()">');
}

function set_rules(){
    rule_set = new Array();
    for (i = 0; i < 12; i++){
        card_rule = document.getElementById('other' + i).value;
        rule_set[i] = card_rule;
    }
    rule_set[12] = 'KINGS CUP!!'
    window.rule_set = rule_set; 
    start_game();
}

function start_game(){
    new_deck();
    pull_card();
    $('#help_button').hide();
    $('#set_up').hide();
    $('#turn').show();
    $('#card').show();
    $('#game_buttons').show();
    game = true;
}

function pull_card(){
    item = Math.random() * deck.length;
    card = window.deck.splice(item,1);
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
        
    current_turn = get_current_turn()
    turn = get_next_turn()    
    
    //need to be called to check if it is the last king
    get_rule(card, current_turn)
    
    //needs to be done to prevent weird flash
    $('#game_buttons').empty();
    $('#card').empty();
    $('#card').append('<img class="center" alt="' + card + '"src=/static/cards/' + 
                card + '.png >');
    $('#game_buttons').append(game_buttons);
    $('#turn').empty();

    if (current_turn != undefined){
        $('#turn').append('<h2 class="center" >Current player: ' + 
                    current_turn + '</h2>');
    }
    
    if (turn != undefined){
        $('#turn').append('<h2 class="center">Next player: ' + 
        turn + '</h2>'); 
    }

}

function get_next_turn(){
    //add test on get number
    if (window.turn_counter == (window.players.length - 1)){
        window.turn_counter = -1;
    }
    window.turn_counter += 1;
    player = window.players[window.turn_counter];
    return player;     
}

function get_current_turn(){
/*    if (window.turn_counter == 0){
        return window.players[window.turn_counter];
    }*/
    return window.players[window.turn_counter];
}

function get_rule(card, player){
    num = String(card);
    num = num.substring(1);
    if (num == 13){
        window.kings +=1;
        if (window.kings == 4){
            if (player == undefined){
                alert('LAST KING! Congratulations!')
            }
            else{
                alert('LAST KING! Congratulations ' + player + '!')
            }
        }
    }
    return window.rule_set[num - 1];
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
    window.deck = deck;
}
