/**
 * Shared Avatar Service - Provides random avatar assignment for users
 * Used by both CommentListComponent and ExportService
 */
class AvatarService {
    constructor() {
        this.avatarCache = new Map(); // username -> avatar path
        this.availableAvatars = [
            // UI Faces collections
            'uifaces-popular-image.jpg', 'uifaces-popular-image (1).jpg', 'uifaces-popular-image (2).jpg',
            'uifaces-popular-image (3).jpg', 'uifaces-popular-image (4).jpg', 'uifaces-popular-image (5).jpg',
            'uifaces-popular-image (6).jpg', 'uifaces-popular-image (7).jpg', 'uifaces-popular-image (8).jpg',
            'uifaces-popular-image (9).jpg', 'uifaces-popular-image (10).jpg', 'uifaces-popular-image (11).jpg',
            'uifaces-popular-image (12).jpg', 'uifaces-popular-image (13).jpg', 'uifaces-popular-image (14).jpg',
            'uifaces-popular-image (15).jpg', 'uifaces-popular-image (16).jpg', 'uifaces-popular-image (17).jpg',
            'uifaces-popular-image (18).jpg', 'uifaces-popular-image (19).jpg', 'uifaces-popular-image (20).jpg',
            'uifaces-popular-image (21).jpg', 'uifaces-popular-image (22).jpg', 'uifaces-popular-image (23).jpg',
            'uifaces-popular-image (24).jpg', 'uifaces-popular-image (25).jpg', 'uifaces-popular-image (26).jpg',
            'uifaces-popular-image (27).jpg', 'uifaces-popular-image (28).jpg', 'uifaces-popular-image (29).jpg',
            'uifaces-popular-image (30).jpg', 'uifaces-popular-image (31).jpg', 'uifaces-popular-image (32).jpg',
            'uifaces-popular-image (33).jpg', 'uifaces-popular-image (34).jpg', 'uifaces-popular-image (35).jpg',
            'uifaces-popular-image (36).jpg', 'uifaces-popular-image (37).jpg', 'uifaces-popular-image (38).jpg',
            'uifaces-popular-image (39).jpg', 'uifaces-popular-image (40).jpg',
            'uifaces-cartoon-image.jpg', 'uifaces-cartoon-image (1).jpg', 'uifaces-cartoon-image (2).jpg',
            'uifaces-cartoon-image (3).jpg', 'uifaces-cartoon-image (4).jpg', 'uifaces-cartoon-image (5).jpg',
            'uifaces-cartoon-image (6).jpg', 'uifaces-cartoon-image (7).jpg', 'uifaces-cartoon-image (8).jpg',
            'uifaces-cartoon-image (9).jpg', 'uifaces-cartoon-image (10).jpg',
            'uifaces-abstract-image.jpg', 'uifaces-abstract-image (1).jpg', 'uifaces-abstract-image (2).jpg',
            // Multiavatar collection
            'Multiavatar-Agent Smith.png', 'Multiavatar-Angel Eyes.png', 'Multiavatar-Bloomdalf.png',
            'Multiavatar-Blue Meal Shake.png', 'Multiavatar-Bogota.png',
            // AI Generated collection
            '0D8GYEZ5ZV.jpg', '0KOFYA2DH9.jpg', '0N10TD1YT7.jpg', '12EDZI4IUB.jpg', '24YZWZJHQ6.jpg',
            '29CMRKCTEB.jpg', '2E4W6ON812.jpg', '2ES91VREPQ.jpg', '2H4SWFRWVS.jpg', '3TJLT955O4.jpg',
            '3TYLBBCF7P.jpg', '3XURERKXNU.jpg', '3YDSX4P3FT.jpg', '4RSCFGIDVP.jpg', '4XFCWCM9FC.jpg',
            '53Z9JB4NN4.jpg', '64YPHA44E0.jpg', '6NO9CH4HT7.jpg', '77LJ868DJ1.jpg', '8B8NPTQO0E.jpg',
            '8UZYNGRDFZ.jpg', '8ZKS4E6S79.jpg', '949WPLTAKL.jpg', '9G6G661H8A.jpg', '9JZOMYC3MA.jpg',
            'AZGWKELIUX.jpg', 'B1LQX0THEN.jpg', 'B7J2VG9ORH.jpg', 'BEYKPOHFR3.jpg', 'BGOCJ4NKTM.jpg',
            'BJS1C7P5U9.jpg', 'BUNFI5P83R.jpg', 'BXDQJVK4HH.jpg', 'CJ7NPHLL9J.jpg', 'CQNP1QDNQR.jpg',
            'DBBX5UEJQS.jpg', 'DQRIFITAHI.jpg', 'DRX8XG920I.jpg', 'EB69YZQPRZ.jpg', 'EDHM1B4EX9.jpg',
            'EMDVLAS0A2.jpg', 'ENCZRXW8KR.jpg', 'EZ36SO1CVP.jpg', 'FM5W02FMPL.jpg', 'FT7JTIMYSE.jpg',
            'GPT8GES81U.jpg', 'HPNG35ORMA.jpg', 'HPPH972FQ4.jpg', 'HVHU5KKR3U.jpg', 'I0A735J2RF.jpg',
            'I9CNJRGU7D.jpg', 'IBOBGB6A7S.jpg', 'INR0A3K4KX.jpg', 'IXW7FU79QJ.jpg', 'J3XAGF0MW3.jpg',
            'JOOW9BRVRY.jpg', 'JSQQ1YQ74A.jpg', 'JU2OFAC3KU.jpg', 'KFCB1ZOINJ.jpg', 'KN84VTYFFX.jpg',
            'KRR4C5WHK5.jpg', 'LBQWCCWBE9.jpg', 'LI09S09CHL.jpg', 'LTJ8T33FHD.jpg', 'LVJND3IYS7.jpg',
            'LWO8HZETAF.jpg', 'M6O8TIS9HV.jpg', 'M8X1CFSZU4.jpg', 'MC5TMY070B.jpg', 'NK48GN2UKV.jpg',
            'NVIMMTVZKD.jpg', 'OZ4J2AENO8.jpg', 'P1XVR0VCZP.jpg', 'PCJLWLZG1I.jpg', 'PXATAMDEH7.jpg',
            'Q2V1WQGZ6G.jpg', 'QDLPQ84LKJ.jpg', 'QSPED2YF4H.jpg', 'R3524GZ096.jpg', 'R5WI4I2OQZ.jpg',
            'RJ7AZ64PC0.jpg', 'RJZWNEYPFE.jpg', 'SGC3JYQCE1.jpg', 'TH79DVHOSJ.jpg', 'U1XNI0R85I.jpg',
            'U5MZIV18GJ.jpg', 'UFBZBO6A8H.jpg', 'X4LJ6H9W4H.jpg', 'X8RY0U098O.jpg', 'XMFY0P6Y97.jpg',
            'XOJVYPW7DK.jpg', 'Y8XX9VIORW.jpg', 'YDXEHJVWUG.jpg', 'YEH9NQXBQP.jpg', 'YGTIIOB1ZW.jpg',
            'YKFY7D1H0X.jpg', 'YNXEXFRXJD.jpg', 'ZBBN45H4TZ.jpg'
        ];
        this.avatarsLoaded = true;
        
        console.log(`🎭 AvatarService loaded with ${this.availableAvatars.length} avatar options`);
    }

    /**
     * Get a random avatar for a username (consistent per user)
     */
    getAvatarForUser(username) {
        // Return cached avatar if already assigned
        if (this.avatarCache.has(username)) {
            return this.avatarCache.get(username);
        }

        // Special case for medicalmedium - use same image as in post header
        if (username === 'medicalmedium') {
            const avatarPath = 'MMCommentExplorer.webp';
            this.avatarCache.set(username, avatarPath);
            return avatarPath;
        }

        // Generate consistent random avatar based on username hash
        const hash = this.hashString(username);
        const avatarIndex = hash % this.availableAvatars.length;
        const selectedAvatar = this.availableAvatars[avatarIndex];
        const avatarPath = `../Avatars/${selectedAvatar}`;
        
        // Cache the assignment
        this.avatarCache.set(username, avatarPath);
        
        console.log(`🎭 Assigned avatar "${selectedAvatar}" to user "${username}"`);
        return avatarPath;
    }

    /**
     * Simple string hash function
     */
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    /**
     * Generate consistent avatar color for username (fallback for initials)
     */
    generateAvatarColor(username) {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F39C12',
            '#E74C3C', '#9B59B6', '#3498DB', '#2ECC71'
        ];
        const hash = this.hashString(username);
        return colors[hash % colors.length];
    }
}

// Create global instance
window.avatarService = new AvatarService();