import * as d3 from 'd3';
import '../../assets/css/charts.css';
import './sankey.js';

const draw = (props) => {

    d3.select('.vis-sankeychart > *').remove();
    const data = props.data;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
		
    var colors = 
    d3.scale
        .ordinal()
        .domain([	
            "BN", 
            "CB", 
            "FM", 
            "HS", 
            "LSP", 				  
            "Bank Notes", 
            "Deposits",
            "Loans and Bonds", 
            "Reserves", 
            "Central Bank Digital Currency"
        ])
        .range([
            "#17335b", 
            "#005172", 
            "#007c8b", 
            "#2f89c9", 
            "#4fc2be",
            "#9c9b9b",   
            "#9c9b9b",  
            "#9c9b9b",  
            "#9c9b9b",
            "#9c9b9b"
        ]);
			
		
    fof_labels={	  
        "BN" : "Banks",
        "CB": "Central Bank",
        "FM": "Firms",
        "HS": "House Holds",
        "LSP": "License Service Providers",
        "Bank Notes": "Bank Notes", 
        "Deposits": "Deposits", 
        "Loans and Bonds": "Loans and Bonds", 
        "Reserves": "Reserves",  
        "Central Bank Digital Currency": "Central Bank Digital Currency"
    }
			
    //create svg  
    var svg = d3.select("#sankeychart").append("svg")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 	"translate(" + margin.left + "," + margin.top + ")");

	/**** Get nodes and links ****/

    /*  
        We are creating a chart like this:
        Total Liabilities  -> Instrument -> Asset
    */

    // We need to add up all the liabilities of each account type per instrument
    // An account type might have 2 deposits liabilites.
    // For example, Banks might have one for households and one for banks.
    // Here we want to add these 2 into 1 deposits liability
    var liability_sub_totals = d3.nest()
        .key(function(d) { return d.account_type; })
        .key(function(d) { return d.asset; })
        .key(function(d) { return d.instrument_type; })
        .rollup(function(values) 
        { 
            return d3.sum(values, function (d) {return d.value})
        })
        .entries(data);

    var links = [];
    var nodes = [];

    liability_sub_totals.forEach(function (acc_type) {
        acc_type.values.forEach(function (is_asset) {
            if (is_asset.key === false) {
                is_asset.values.forEach(function (ins_type) {
                    nodes.push({ "name": acc_type.key + " liability"});
                    links.push({ 
                        "source": acc_type.key + " liability", 
                        "target": ins_type.key,
                        "value": ins_type.values,
                        "liability": acc_type.key + " liability", 
                        "instrument": ins_type.key, 
                        "color": acc_type.key,
                        "first": acc_type.key,
                        "second": ins_type.key,
                        "liaIns": "L" + acc_type.key + " liability" + ins_type.key,
                        "liaIns2": acc_type.key + "_" + ins_type.key
                    });
                })
            }
        })
        
    }); 

    //get all source and target into nodes
    //will reduce to unique in the next step
    //also get links in object form
    data.forEach(function (d) {
        if (d.asset === false){
            nodes.push({ "name": d.instrument_type });
            nodes.push({ "name": d.counter_party + " asset"});
            links.push({ 
                "source": d.instrument_type, 
                "target": d.counter_party + " asset", 
                "value": d.value,
                "liability": d.account_type + " liability", 
                "instrument": d.instrument_type, 
                "color": d.instrument_type, 
                "first": d.instrument_type, 
                "second": d.instrument_type, 
                "third": d.counter_party,
                "liaIns": "L" + d.account_type + " liability" + d.instrument_type,
                "liaIns2": d.instrument_type + "_" + d.instrument_type + "_" + d.counter_party
            });
        }
    }); 

    // Reduce to unique set of nodes
    nodes = d3.keys(d3.nest()
        .key(function (d) { return d.name; })
        .map(nodes));

    // Substitute source and target with node id
    links.forEach(function (d) {
        d.source = nodes.indexOf(d.source);
        d.target = nodes.indexOf(d.target);
            d.liability = nodes.indexOf(d.liability);
            d.instrument = nodes.indexOf(d.instrument);
    });
        
    // Get back nodes as an array of objects
    nodes.forEach(function (d, i) {
        nodes[i] = { "name": d };
    });


    linksX = [];

    links.forEach(function (d) {
        linksX.push({
            "source": d.source,
            "target": d.target,
            "value": d[year],
            "color": d.color,
            "liaIns": "L" + d.liability + d.instrument,
            "liaIns2": d.first + "_" + d.second + "_" + d.third
            
        });
    });


    /************************/
    
    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(20)
        .nodePadding(7)
        .size([width, height])
        .nodes(nodes)
        .links(linksX)
        .layout(32);
	
	var path = sankey.link();
			
    // add in the links
    var link = svg
        .append("g").selectAll(".link")
        .data(linksX)
        .enter()
        .append("path")
        .attr("class", function (d) {
            //console.log(d.source.name)
            return "link" + " " + d.liaIns+" "+d.color;
        })
        .attr("d", path)
        .style("stroke-width", function(d) {
            if (d.dy > 0.0006){
                return Math.max(1, d.dy); 
            } else {
                    return 0;
            }
        })
        .style("stroke", function (d) {
            
            return colors(d.color);
        })
        .sort(function(a, b) { return b.dy - a.dy; })
        .on('mouseover',function(d) {
                    if(d.value != 0.0006){
                                    
                        source= d.source.name.replace(/ liability| asset|/gi, "");
                        target= d.target.name.replace(/ liability| asset|/gi, "");
                    
                        d3.select("#info").html(fof_labels[source] + " &#8594; "+fof_labels[target] + ": <span class='bold'> £" +fmt(d.value)+" billion </span>")
                        
                        d3.select(this).style("stroke-opacity", 0.5)
                        
                        d3.selectAll("." + d.liaIns)	.style("stroke-opacity", 0.5)
                    }
                    })
        .on('mouseout',function() {
                $("#info").empty();
                d3.selectAll("path").style("stroke-opacity", 0.07)
        })
		
		
    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; 
        })
				
					
    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            var name = d.name.replace(/ liability| asset|/gi, "");
            return d.color = colors(name);
        })
        .on('mouseover',function(d) {
            
            node= d.name.replace(/ liability| asset|/gi, "");
            
            if(d.name.substr(d.name.lastIndexOf(" ass")+1)=="asset") {
                text = "asset"
            } else if(d.name.substr(d.name.lastIndexOf(" lia")+1) == "liability"){
                text = "liability"
            } else {
                text = "";
            }
            
            d3.select("#info").html(fof_labels[node] +" "+ text+ ": <span class='bold'> £" +fmt(d.value)+" billion </span>");
            d3.select(this).classed("highlight", true);	
            var name = d.name.replace(/ liability| asset|/gi, "");
            d3.selectAll("."+name).style("stroke-opacity", 0.5)				
        })
        .on('mouseout',function(d) {
            $("#info").empty();
            d3.select(this).classed("highlight", false)
            d3.selectAll("path").style("stroke-opacity", 0.07)		
        })
		
    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { 
                name = d.name.replace("_", "&");
                asset = name.replace(" asset", "");
                liability =asset.replace(" liability", "");
                return liability; 
        })
        .filter(function(d) { return d.x <  width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");
		
}

export default draw;