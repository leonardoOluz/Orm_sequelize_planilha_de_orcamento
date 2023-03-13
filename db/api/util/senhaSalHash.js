const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function criarSenhaSalHash(senha) {
    const sal = randomBytes(16).toString('hex')
    const senhaHash = scryptSync(senha, sal, 64).toString('hex')
    return `${sal}:${senhaHash}`

}
async function descriptografarHashSal(senha, hash, sal) {
    const testeHash = scryptSync(senha, sal, 64)
    const hashReal = Buffer.from(hash, 'hex')
    return timingSafeEqual(testeHash, hashReal)
}

module.exports = {criarSenhaSalHash, descriptografarHashSal};
