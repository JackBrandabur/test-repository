/*Jack Brandabur
CSE383
Lab10
November 2nd 2022*/
var URL="https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
var processCounter=0;
var loadCounter=0;
var networkCounter=0;
var errorCounter=0;
var txBytes = 0;
var rxBytes = 0;
getLoadAvg();
getBytes();
getProcess();

function getProcess() {

    a=$.ajax({
        url: URL + '/vi/api/ps',
        method: "GET"
    }).done(function(data) {
        processCounter++;
        $("#processRun").html(processCounter);
        $("#processes").html("<tr><th>User </th><th>Pid</th><th>runtime</th><th>Command</th></tr>");
        length = data.ps.length;
        for (i = 0; i < length; i++) {
            $("#processes").append("<tr><td>" + data.ps[i].user+"</td><td>" + data.ps[i].pid + "</td><td>" + data.ps[i].runTime + "</td><td>" + data.ps[i].cmd +"</td></tr>");
        }
        setTimeout(getProcess,5000);
    }).fail(function(error) {
        errorCounter++;
        $("#logRun").html(errorCounter);
        console.log("error",error.statusText);
        $("#log").prepend("Process error "+new Date()+"<br>");
        setTimeout(getProcess,1000);
    });
}

function getLoadAvg() {

	a=$.ajax({
		url: URL + '/vi/api/loadavg',
		method: "GET"
	}).done(function(data) {
		loadCounter++;
		$("#loadRun").html(loadCounter);
		$("#onemin").text(data.loadavg.OneMinAvg);
		$("#fivemin").text(data.loadavg.FiveMinAvg);
		$("#fifteenmin").text(data.loadavg.FifteenMinAvg);
		$("#numRunning").text(data.loadavg.NumRunning);
		$("#ttlProc").text(data.loadavg.TtlProcesses);
		setTimeout(getLoadAvg,5000);
	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("Load error "+new Date()+"<br>");
		setTimeout(getLoadAvg,1000);
	});
}

function getBytes() {

        a=$.ajax({
                url: URL + '/vi/api/network',
                method: "GET"
        }).done(function(data) {
                networkCounter++;
                $("#networkRun").html(networkCounter);
                $("#txbytes").text(data.network.txbytes);
                $("#rxbytes").text(data.network.rxbytes);
		$("#txavg").text((data.network.txbytes - txBytes)/5);
                $("#rxavg").text((data.network.rxbytes - rxBytes)/5);
		txBytes = data.network.txbytes
                rcBytes = data.network.rxbytes
		setTimeout(getBytes,5000);
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Byte error "+new Date()+"<br>");
                setTimeout(getBytes,1000);
        });
}

