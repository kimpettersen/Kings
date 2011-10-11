var turn_counter = 0;
var game = false;
var kings = 0;
$(document).ready(function(){
    $('#help_button').hide();
    $('#help').hide();
    $('#turn').hide();
    $('#card').hide();
    $('#count').hide();
    $('#rule_text').hide();
    $('#rule').hide();
    $('#set_up').hide();
    
    $(document).keydown(function(e) {
      if (e.keyCode == '32' || e.keyCode == 13) {
        if (game == true){
            pull_card();
        }
      }
    });
})
//style="width:339px;height:70px;padding:20px;font-size:30px;color:#747474;" 
function start(){
    $('#welcome').hide();
    $('.set_up').append('<input type="text" class="input_field" id="num" 
    value="Number of players"/>
    <img onclick="set_players()"style="padding-top:20px;"src="static/button_proceed.png">');
}
function hide_help(){
    $('#help').hide();
    $('#help_button').show();
    $('.set_up').show();
}

function show_help(){
    $('.set_up').hide();
    $('#help_button').hide();
    $('#help').show();
}

function set_players(){
        var number = document.getElementById('num').value;
        number = parseInt(number);
        window.number_of_players = number;
        $('.set_up').empty();
        for(i = 0; i < window.number_of_players; i++){
            var player_number = i + 1;
            $('.set_up').append('<div class="player_names"><input class="input_field" value="Player #' + player_number + '" type="text" id="' + i + '" /></div>');
        }
        $('.set_up').append('<img id="proceed_button" src="static/button_proceed.png" onclick=register_players()>');
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
    rules = new Array('Custom', 'ten chen','five hewil','eigth hate','You demand')
    for (i = 0; i < 13; i++){
        if (i == 11){
            name = 'Jack';
        }
        else if (i == 12){
            name = 'Queen';
        }
        else{
            name = i;        }

        $('.set_up').append('<div class="rule_dropdown"><h2>Rule for the ' + name + '</h2><select id="rule' + i + '" name="rule' + i + '">');
      for(j = 0; j < rules.length; j++){
            $('#rule'+i).append('<option>' + rules[j] + '</option>');
      }
      $('.set_up').append('</select>');
      $('.set_up').append('<input id="other' + i + '" type="text"/></div>')
    }   
    $('.set_up').append('<br/><button onclick="set_rules()">Start the game</button>');
}

function set_rules(){
    rule_set = new Array();
    for (i = 0; i < 13; i++){
        opt = document.getElementById('rule' + i).value;
        if (opt == 'Custom'){
            opt = document.getElementById('other' + i).value;
        }
        rule_set[i] = opt;
    }
    rule_set[13] = 'KINGS CUP!!'
    window.rule_set = rule_set;    
    start_game();
}

function start_game(){
    new_deck();    
    $('#help_button').hide();
    $('.set_up').hide();
    $('#turn').show();
    $('#card').show();
    turn = get_next_turn()
    if(turn != undefined){
       $('#turn').append(turn + ' get to start');
    }
    $('#card').append('<h1>Click here to start</h1>')
    game = true;
    
}


function pull_card(){
    item = Math.random() * deck.length;
    card = window.deck.splice(item,1);
    display_card(card);
}

function display_card(card){
    if(card < 1){
        ans = confirm("Deck is empty. Do you want to start over?")
        if(ans){
            window.location.reload();
        }
        else{
            alert('Then you dont really have anything to do on this site');
        }
    }
    //need to be called to check if it is the last king
    get_rule(card, get_current_turn());
    $('#rule').show();
    $('#card').empty();
    $('#card').append('<img alt="' + card + '"src=/static/cards/' + card + '.png />');
    $('#turn').empty();
    turn = get_next_turn()
    if(turn != undefined){
        $('#turn').append('Next player to draw is: ' + turn);
    }
        //Not used for anything right now..
    window.count -= 1;
}

function get_rule(card, player){
    num = String(card);
    num = num.substring(1);
    if (num == 13){
        kings +=1;
        if (kings == 4){
            if (player == undefined){
                alert('LAST KING! Congratulations!')
            }
            else{
                alert('LAST KING! Congratulations ' + player + '!')
            }
        }
    }
    return window.rule_set[num];
}

function get_next_turn(){
    if (turn_counter == window.players.length){
        turn_counter = 0;
    }

    player = window.players[turn_counter];
    turn_counter += 1;
    return player;     
}

function get_current_turn(){
    return window.players[turn_counter-1]
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
    window.count = 52;
}
