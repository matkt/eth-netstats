'use strict';

/* Controllers */

function StatsCtrl($scope, socket, _) {

	// Socket listeners
	// ----------------

	socket.on('init', function(data){
		$scope.nodes = data.nodes;

		updateStats();
	});

	socket.on('update', function(data){
		$scope.nodes[data.id] = data;

		updateStats();
	});

	function updateStats()
	{
		$scope.nodesTotal = $scope.nodes.length;
		$scope.nodesActive = _.filter($scope.nodes, function(node){ return node.stats.active == true; }).length;
		$scope.bestBlock = _.max($scope.nodes, function(node){ return parseInt(node.stats.block.height); }).stats.block.height;
		$scope.lastBlock = _.max($scope.nodes, function(node){ return parseInt(node.stats.block.timestamp); }).stats.block.timestamp;
	}
}