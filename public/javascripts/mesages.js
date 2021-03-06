(function (exports) {
    /*
     * Client to server: game is complete and the winner is
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    /*
    * server to client: abort game
    */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    };

    /*
    * client A to server or server to client B: hit
    */
    exports.FIRE = {
        type: "FIRED"
    };

    /*
    * client to server:boats PLaced
    */
    exports.PLACED = {
        type: "PLACED"
    };

    /*
    * server to client: grid
    */
    exports.GRID = {
        type: "GRID"
    };

    /*
    * server to Player: game over won/loss
    */
    exports.T_GAME_OVER = "GAME OVER";
    exports.O_GAME_OVER = {
        type: exports.T_GAME_WON_OVER,
        data: null
    };
}(typeof exports === "undefined" ? this.Messages = {} : exports));