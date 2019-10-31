export class FirebaseServiceHelper {
    /**
     * Method : checkGameExists
     * Desc   : Check if Game exists
     * @param gameList
     * @param gameName
     */
    checkGameExists(gameList, gameName) {
        for (let i = 0 ; i < gameList.length ; i++) {
            if (gameList[i].id === gameName) {
                return true;
            }
        }
        return false;
    }
}
