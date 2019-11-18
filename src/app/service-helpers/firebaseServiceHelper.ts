export class FirebaseServiceHelper {
    /**
     * Method : checkGameExists
     * Desc   : Check if Game exists
     * @param gameList
     * @param gameName
     */
    checkGameExists (gameList, gameName: string) {
        for (let i = 0 ; i < gameList.length ; i++) {
            if (gameList[i].id === gameName) {
                return true;
            }
        }
        return false;
    }

    /**
     * Generate unique id for usernames
     * @param name
     */
    generateRandomUserId (name: string) {
        return name.split(' ').join('') + new Date().getTime();
    }
}
