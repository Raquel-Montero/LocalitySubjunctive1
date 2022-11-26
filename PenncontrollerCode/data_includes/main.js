
// Remove command prefix
PennController.ResetPrefix(null)
DebugOff()

Header(
    newVar("Email").global(),
    newVar("Idioma").global(),
    newVar("Nacimiento").global(),
    newVar("Residenciaactual").global(),
    newVar("Residenciaprevios").global(),
    newVar("Edad").global()
)
    
.log( "Email" , getVar("Email") )
.log( "Idioma" , getVar("Idioma"))
.log( "Nacimiento" , getVar("Nacimiento") )
.log( "Residenciaactual" , getVar("Residenciaactual") )
.log( "Residenciaprevios" , getVar("Residenciaprevios") )
.log( "Edad" , getVar("Edad") )

Sequence("consent","setcounter", "participants", "instructions", "training", "pre-experimento", randomize("experiment") , SendResults(), "explicacion" )


SetCounter("setcounter")
// formulario de consentimiento. 
newTrial("consent",
    newHtml("consent_explanation", "consent.html")
        .cssContainer({"line-height":"1.7em"})
        .print(),

    newHtml("form", `<div class='fancy'><input name='consent' id='consent' type='checkbox'><label for='consent'>Tengo 18 años o más y he leído la información general sobre el proyecto de investigación “STAR-FISH”. Doy mi consentimiento para participar en el proyecto y que mis datos sean procesados dentro de este ámbito. Además, doy mi consentimiento para todos los casos de procesamiento de datos descritos en la sección "Uso posterior de los datos".</label></div>`)
        .cssContainer({"width":"70%", "margin":"auto", "margin-bottom":"20px"})
        .print()
    ,
    newFunction( () => $("#consent").change( e=>{
        if (e.target.checked) getButton("go_to_participants").enable()._runPromises();
        else getButton("go_to_participants").disable()._runPromises();
    }) ).call()
    ,
    newButton("go_to_participants", "Empezar el experimento")
        .cssContainer({"width":"70%", "margin-bottom":"50px","margin-left":"130px"})
        .disable()
        .print()
        .wait()
)

// Informacion demografica participantes 
newTrial("participants",
    defaultText
        .cssContainer({"width":"70%","margin":"auto", "margin-bottom":"1em"})
        .print()
    ,
    newText("participant_info_header", "<div class='fancy'><h2>Datos Demográficos</h2><p>Todos los datos obtenidos serán tratados de forma estrictamente anónima y no será posible su identificación posteriormente.</p></div>")
    ,
    // lugar de nacimiento 
    newText("<b>*Lugar de nacimiento (comunidad autónoma):</b><br>(presione ENTER para continuar)")
    ,
    newTextInput("input_nacimiento")
        .cssContainer({"width":"70%", "margin":"auto","margin-bottom":"15px"})
        .length(50)
        .log()
        .print()
        .wait(getTextInput("input_nacimiento").testNot.text(""))
    ,
    // lugar de residencia
    newText("<b>*Lugar de residencia actual (comunidad autónoma):</b><br>(presione ENTER para continuar)")
    ,
    newTextInput("input_residencia")
        .cssContainer({"width":"70%","margin":"auto", "margin-bottom":"15px"})
        .length(50)
        .log()
        .print()
        .wait(getTextInput("input_residencia").testNot.text("") )
    ,
       // lugares de residencia previos
    newText("<b>Lugares de residencia previos (comunidad autónoma):</b><br>(presione ENTER para continuar)")
    ,
    newTextInput("input_residenciaprevios")
        .cssContainer({"width":"70%","margin":"auto", "margin-bottom":"15px"})
        .length(50)
        .log()
        .print()
        .wait()
    ,
    
    // Otras lenguas maternas
    newText("<b>Otras lenguas maternas:</b> además del español<br>(presione ENTER para continuar)")
    ,
    newTextInput("input_idioma")
        .cssContainer({"width":"70%", "margin":"auto", "margin-bottom":"15px"})
        .length(50)
        .log()
        .print()
        .wait()
    ,
    // Edad
    newText("<b>*Edad:</b><br>(presione ENTER para continuar)")
    ,
    newTextInput("input_edad")
        .cssContainer({"width":"70%", "margin":"auto", "margin-bottom":"30px"})
        .length(3)
        .log()
        .print()
        .wait(getTextInput("input_edad").testNot.text(""))
    
    ,//Email
    newText("<b>Email:</b> opcional, solo es necesario si quiere participar en el sorteo<br>(presione ENTER para continuar)")
    ,
    newTextInput("input_email")
        .cssContainer({"width":"70%", "margin":"auto", "margin-bottom":"15px"})
        .length(50)
        .log()
        .print()
        .wait()
    ,
    newButton("go_to_instructions", "Guardar y continuar")
        .cssContainer({"margin":"auto","margin-bottom":"20px"})
        .print()
        .wait()
    ,
    // Almacenar los inputs como var elements: 
        getVar("Nacimiento") .set(getTextInput("input_nacimiento") ), 
        getVar("Residenciaactual") .set(getTextInput("input_residencia") ),
        getVar("Residenciaprevios") .set(getTextInput("input_residenciaprevios") ),
        getVar("Idioma") .set(getTextInput("input_idioma") ),
        getVar("Edad") .set(getTextInput("input_edad") ), 
        getVar("Email") .set(getTextInput("input_email") )
    
)




// Instructions
newTrial("instructions",
    newText("instructions_greeting", "<center><h2>Instrucciones</h2></center><p> Antes de empezar con el experimento, en esta sección explicamos el procedimento a seguir. La tarea del participante consiste en leer una serie de frases y evaluarlas en una escala del 1 al 5 dependiendo de su acceptabilidad. Asignar un 5 significa que la frase es perfectamente aceptable, y un 1 que no es acceptable. Para seleccionar una opción, clique en la casilla correspondiente: </p>")
        .cssContainer({"width":"70%","margin":"auto", "line-height":"1.7em"})
        .print()
        ,
    // 5-point scale
    newScale(5)
        .before( newText("left", "<div class='fancy'>(<em>no suena aceptable</em>)</div>") )
        .after( newText("right", "<div class='fancy'>(<em>suena aceptable</em>)</div>") )
        .keys()
        .labelsPosition("top")
        .color("DodgerBlue")
        .cssContainer({"margin":"auto"})
        .settings.center()
        .print()
        ,
        newText("instructions_ejemplos", "<p> A la hora de evaluar las frases tenga en cuenta que no hay una respuesta (in)correcta y que no hay un límite de tiempo. Lea las frases con detenimineto y siga su intuición. Cada frase está acompañada de un audio. Este se reproduce automáticamente al pulsar el botón <q>Continuar</q>. Puede escuchar el audio tantas veces como necesite. <br>  Para que se familiarice con la dinámica primero le mostramos un ejemplo de dos frases y sus correspondientes juicios de acceptabilidad. </p>")
        .left()
        .cssContainer({"width":"70%","margin":"auto", "line-height":"1.7em"})
        .print()
        ,
         newText("instructions_frase", "<ol> <li> <em> Ana quiere que Juan venga </em> </li> <li> <em>Juan consiguió que Ana viene</em> </li></ol>")
        .settings.center()
        .cssContainer({"width":"70%","margin":"auto","line-height":"1.7em"})
        .print()
        ,
         newText("instructions_explicacion", "<p> La primera frase obtendría una puntuación de un 5, mientras que a la segunda frase le correspondería un 1. Antes de empezar, primero haremos una fase de entrenamiento con 3 frases para que pueda practicar. Tras esto, vendrá el experimento, que funciona exactamente igual que la fase anterior, pero con más frases a evaluar. <br>¡Empezamos con la práctica!  </p>")
        .left()
        .cssContainer({"width":"70%","margin":"auto", "line-height":"1.7em"})
        .print()
        ,
    newButton("go_to_exercise", "Empezar práctica")
        .cssContainer({"margin":"auto","margin-bottom":"20px"})
        .print()
        .wait()
)

// Training Phase:
Template("training2.csv", row=>
    newTrial("training",
        newText("referencia","<p> Si la siguiente frase obtiene un 1 de puntuación </br> <em>Juan consiguió que apruebas</em> <br> ¿Qué puntuación le daría a la siguiente frase?</p>  ")
        .cssContainer({"margin":"auto", "line-height":"1.5em"})
        .print()
    ,
   newAudio("audio-button-trial", row.Audio)
       .cssContainer({"margin":"auto","margin-bottom":"10px"})
           .print() 
   ,
    newText("sentence-trial", row.Sentence)
            .cssContainer({"margin":"auto","margin-bottom":"10px"})
            .print()
            
    ,
    newScale("escala-trial", "1","2","3","4","5")
            .before( newText("left", "<div>&#128530;</div>") )
            .after( newText("right", "<div>&#129392;</div>") )
            .keys()
            .log()
            .labelsPosition("top")
            .cssContainer({ "margin":"auto","margin-bottom":"20px"})
            .print()
    ,
    newButton("go_to_next", "Continuar")
        .cssContainer({"margin":"auto"})
        .print()
        .wait(getScale("escala-trial") .test.selected() )
    ) 
    
)
    //Message: End of Practice 
newTrial("pre-experimento",
        newText("pre-experimento", "<p>¡Perfecto! Con esto finalizamos la fase de entranamiento.<br> Pulse el botón de <q>continuar</q> para empezar con el experimento.  </p>")
        .cssContainer({"margin":"auto", "line-height":"1.7em"})
        .print()
    ,
    newButton("go_to_experiment", "Continuar")
        .cssContainer({"margin":"auto"})
        .print()
        .wait()
)

// Experiment:
Template("experiment.csv", row=>
    newTrial("experiment",
        newText("referenciae","<p> Si la siguiente frase obtiene un 1 de puntuación </br> <em>Juan consiguió que apruebas</em> <br> ¿Qué puntuación le daría a la siguiente frase?</p>  ")
        .cssContainer({"margin":"auto", "line-height":"1.5em"})
        .print()
    ,
    newAudio("audio-button", row.Audio)
            .cssContainer({"margin":"auto","margin-bottom":"10px"})
            .print()
    ,
    newText("sentence", row.Sentences)
            .cssContainer({"margin":"auto","margin-bottom":"10px"})
            .print()
    ,
    newScale("escala", "1","2","3","4","5")
            .before( newText("left", "<div>&#128530;</div>") )
            .after( newText("right", "<div>&#129392;</div>") )
            .keys()
            .log()
            .labelsPosition("top")
            .cssContainer({ "margin":"auto","margin-bottom":"20px"})
            .print()
    ,
    newButton("go_to_next_item", "Continuar")
        .cssContainer({"margin":"auto"})
        .print()
        .wait(getScale("escala") .test.selected())
    ) 
    .log("Group" , row.Group)
    .log("Experiment" , row.Experiment)
    .log("Itemname" , row.ItemName)
    .log("Itemno" , row.Itemno)
    .log("Mood" , row.Mood)
    .log("Factivity" , row.Factivity)
    .log("Verb", row.Verb)
    .log("words" , row.Words)
    
)
//Explicacion del estudio: 
newTrial("explicacion", 
    newHtml("explicacion", "explicacion.html")
        .cssContainer({"line-height":"1.7em"})
        .cssContainer({"margin":"auto"})
        .print()
        .wait()
    , 
    newButton().wait
    
)