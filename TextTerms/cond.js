const cond = [
"Vous acceptez de ne pas contourner les mesures de sécurité de l'application ni d'engager des actions susceptibles de compromettre son intégrité.",
"Les informations financières fournies par l'application sont à titre informatif uniquement et ne constituent pas des conseils financiers professionnels.",
"Vous êtes responsable de toutes les activités effectuées à partir de votre compte.",
"L'utilisation abusive des fonctionnalités de l'intelligence artificielle de l'application est interdite.",
"L'application peut être soumise à des mises à jour périodiques, vous acceptez de maintenir la version la plus récente pour bénéficier des fonctionnalités optimales.",
"L'utilisation de robots, scripts ou tout autre moyen automatisé pour interagir avec l'application est strictement interdite.",
"Tout contenu généré par l'utilisateur doit respecter les droits d'auteur et ne pas violer les lois en vigueur.",
"L'accès à certaines fonctionnalités de l'application peut nécessiter des frais, et vous en serez informé avant toute transaction.",
"La résiliation de votre compte peut résulter de violations répétées des règles ou conditions d'utilisation.",
"L'application se réserve le droit de récompenser ses utilisateurs fidèles par le biais de cadeaux ou d'avantages spéciaux, soumis à des conditions spécifiques.",
"Vous avez la possibilité de partager l'application avec d'autres utilisateurs, mais vous restez responsable de l'utilisation qui en est faite par ces derniers.",
"En aucun cas, même si prétendument sollicité par un prétendu agent de l'application, ne partagez votre nom d'utilisateur avec d'autres personnes. Une alerte sera émise pour rappeler cette règle cruciale.",
"Les utilisateurs sont tenus de signaler immédiatement toute activité suspecte ou non autorisée sur leur compte, afin de maintenir la sécurité globale de l'application.",
"L'utilisation de l'application implique votre accord pour recevoir des notifications relatives aux mises à jour, promotions ou alertes importantes liées au service.",
"L'accès à certaines fonctionnalités de l'application peut nécessiter une connexion internet stable et des appareils compatibles.",
"Vous acceptez de ne pas utiliser l'application d'une manière qui pourrait entraver son bon fonctionnement ou causer des perturbations pour d'autres utilisateurs.",
"Les utilisateurs sont responsables de la sauvegarde de leurs propres données, l'application ne garantit pas la récupération en cas de perte.",
"L'application peut fournir des liens vers des sites tiers, et les utilisateurs doivent exercer leur propre discernement quant à leur utilisation, car l'application n'est pas responsable du contenu externe.",
"En continuant vous acceptez que moon face de mise à jour automatique de l'application pour des nouvelles fonctionnalités ou pour améliorer la sécurité de l'application",
"Les conditions d'utilisation peuvent être modifiées à tout moment, et il est de la responsabilité de l'utilisateur de consulter régulièrement les mises à jour.",
]

const CondTask = cond.map((text, id) => (
  {
    id: id,
    text: text
  }
))

export const Cond = [{
  title: "Conditions",
  data: [...CondTask]
}]
