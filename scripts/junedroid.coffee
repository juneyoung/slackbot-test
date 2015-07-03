# hubot greetings
# writen by JuneyoungOh 2015.07.03

squirrels = [
  "Yeah~, That sounds like you :D"
  , "You, too :-D"
  , "How's your parents?"
]

module.exports = (robot) ->
  robot.respons /fuck/gi, (msg) ->
    msg.send msg.random.squirrels

