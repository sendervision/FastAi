const terms = [
  "Aucun contenu pour adultes sous toutes ses formes n'est autorisé.",
  "Utilisez l'application pour une communication sécurisée et rapide dans les domaines de l'intelligence artificielle, du marketing et de la finance.",
  "Tenez-vous informé des éventuelles modifications des conditions et règles d'utilisation.",
  "Respectez la confidentialité des informations partagées et évitez tout comportement préjudiciable envers d'autres utilisateurs.",
  "Signalez tout comportement inapproprié ou contenu contraire aux règles.",
  "L'utilisation de l'application pour des activités illégales est strictement interdite.",
  "Gardez vos informations de connexion confidentielles et ne partagez pas votre compte avec d'autres personnes",
  "L'application peut recueillir des données pour améliorer les fonctionnalités, assurez-vous de comprendre la politique de confidentialité.",
  "Soyez conscient des risques potentiels liés à la sécurité en ligne et prenez les mesures appropriées pour protéger vos données",
  "En cas de questions ou de préoccupations, contactez le support client.",
  "Aucune forme de harcèlement, de discrimination ou de discours haineux n'est tolérée dans les interactions au sein de l'application.",
  "L'utilisation de l'application à des fins de spam est proscrite.",
  "Vous acceptez de ne pas utiliser l'application de manière à nuire à sa réputation ou à celle de ses utilisateurs.",
  "Tout comportement frauduleux, y compris la tentative d'usurpation d'identité, est strictement interdit.",
  "La diffusion de fausses informations, en particulier dans le domaine financier, est contre les règles d'utilisation.",
  "L'accès à certaines fonctionnalités de l'application peut nécessiter une connexion internet stable et des appareils compatibles.",
  "L'utilisation de l'application implique votre accord pour recevoir des notifications relatives aux mises à jour, promotions ou alertes importantes liées au service.",
  "Les utilisateurs sont tenus de signaler immédiatement toute activité suspecte ou non autorisée sur leur compte, afin de maintenir la sécurité globale de l'application.",
  "L'application peut fournir des liens vers des sites tiers, et les utilisateurs doivent exercer leur propre discernement quant à leur utilisation, car l'application n'est pas responsable du contenu externe.",
  "Les conditions d'utilisation peuvent être modifiées à tout moment, et il est de la responsabilité de l'utilisateur de consulter régulièrement les mises à jour.",

]

const TermsTask = terms.map((text, id) => (
  {
    id: id,
    text: text
  }
))

export const Terms = [{
  title: "Terms",
  data: [...TermsTask]
}]
