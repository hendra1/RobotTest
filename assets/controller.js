var DIRECTION = {
    north: [0, "^"],
    west: [270, "<"],
    east: [90, ">"],
    south: [180, "v"]
};

var maxViewPort;
var curDirection;
var curPosition;
var startSession;
var insertID;

$(function() {
    $.fn.CreateViewPort = function(e, t) {
        $currentElement = $(this);
        for (i = e - 1; i >= 0; i--) {
            for (j = 0; j < t; j++) {
                $currentElement.append('<div class="element" data="' + i + "," + j + '"></div>');
                if (j == t - 1) $currentElement.append("<div class='clear-both'></div>")
            }
        }
        return [e - 1, t - 1]
    };
	
    $.fn.PlaceRobot = function(e, t, n) {
        $currentElement = $(this);
        $currentElement.find(".element").each(function(r) {
            if ($(this).attr("data") == t + "," + e) {
                for (x in DIRECTION) {
                    if (x == n) {
                        $(this).html("<img src='android_robot.png' alt='robot-png' data='" + e + "," + t + "," + n + "'class='robot " + n + "'/> <span>" + DIRECTION[x][1] + "</span>")
                    }
                }
            }
        })
    };
	
    $.fn.Turn = function(e) {
        turnDegree = e == "left" ? -90 : 90;
        var t = $(this).find(".robot");
        currentDirection = t.attr("class");
        currentDirection = currentDirection.replace("robot ", "");
		
        currentPosition = t.closest(".element").attr("data").split(",");
        currentPosition = [parseInt(currentPosition[0]), parseInt(currentPosition[1])];		
		
        var n = DIRECTION[currentDirection][0] + turnDegree;
        n = n >= 360 ? n % 360 : n;
        n = n < 0 ? 360 + n : n;
        //console.log(n);
        var r = currentDirection;
        for (x in DIRECTION) {
            if (DIRECTION[x][0] == n) r = x
        }
        t.removeClass(currentDirection);
        t.addClass(r);
        t.parent().find("span").html(DIRECTION[r][1])
		
		console.log(currentPosition);
		console.log(r);
		curDirection = r;
		curPosition = currentPosition;
    };
	
    $.fn.Move = function(e) {
        var t = $(this).find(".robot");
        currentDirection = t.attr("class");
        currentDirection = currentDirection.replace("robot ", "");
        currentPosition = t.closest(".element").attr("data").split(",");
        currentPosition = [parseInt(currentPosition[0]), parseInt(currentPosition[1])];
        //console.log(currentPosition);

		
        if (currentDirection == "west") {
            currentPosition = [currentPosition[0], currentPosition[1] - 1]
        } else if (currentDirection == "north") {
            currentPosition = [currentPosition[0] + 1, currentPosition[1]]
        } else if (currentDirection == "east") {
            currentPosition = [currentPosition[0], currentPosition[1] + 1]
        } else if (currentDirection == "south") {
            currentPosition = [currentPosition[0] - 1, currentPosition[1]]
        } else console.log("error");
        if (e[0] < currentPosition[0] || e[1] < currentPosition[1] || currentPosition[0] < 0 || currentPosition[1] < 0) return;
        t.siblings("span").remove();
        t.remove();
        $(this).PlaceRobot(currentPosition[1], currentPosition[0], currentDirection)
		
        console.log(currentPosition);
		console.log(currentDirection);		
		
		curDirection = currentDirection;
		curPosition = currentPosition;		
    };
	
	$.fn.Save = function(e){
			$.ajax({
				url: 'save.php',
				type: 'post',
				data: {position: curPosition, direction: curDirection, start:startSession },
				success:function(result){
					console.log(result);
					insertID = result.insertId;
				}

			});	
	};
	
	$.fn.Report = function(e){
		if(insertID){
			$.ajax({
				url: 'report.php',
				type: 'post',
				data: {id: insertID},
				success:function(result){
					console.log(result);
					$('.report-value').html(JSON.stringify(result));
				}

			});	
		}else{
			alert('Please Save first, then can make a report!');
		}
	};	
	
    maxViewPort = $("body .viewport").CreateViewPort(5, 5);
    $(".command input").click(function() {
        if ($(this).hasClass("place")) {
            $(".robot").remove();
            $(".robot").siblings("span").remove();
            var e = prompt("Please Enter Coordinate", "0,0,east");
            e = e.split(",");
            if (maxViewPort[0] < e[0] || maxViewPort[1] < e[1]) alert("Please input below MAX Viewport");
            $("body .viewport").PlaceRobot(e[0], e[1], e[2])
			
			insertID = null;
			var newDate = new Date();
			month = newDate.getMonth()+1;
			var datetime = newDate.getFullYear()+'-'+month+'-'+newDate.getDate()+' '+newDate.getHours()+':'+newDate.getMinutes()+':'+newDate.getSeconds();
			startSession = datetime;
			console.log(datetime);
			
        } else if ($(this).hasClass("right")) {
            if ($(".robot").length > 0) $("body .viewport").Turn("right")
        } else if ($(this).hasClass("left")) {
            if ($(".robot").length > 0) $("body .viewport").Turn("left")
        } else if ($(this).hasClass("move")) {
            if ($(".robot").length > 0) $("body .viewport").Move(maxViewPort)
        } else if ($(this).hasClass("save")) {
            if ($(".robot").length > 0) $("body .viewport").Save(maxViewPort)
        } else if ($(this).hasClass("report")) {
            if ($(".robot").length > 0) $("body .viewport").Report(maxViewPort)
        } 
        $(this).siblings(".coordinate-now").find("h2").html($(".robot").attr("data"))
    })

		
})
