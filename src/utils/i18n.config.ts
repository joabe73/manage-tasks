import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          confirm: 'Confirm',
          confirmation: 'Confirmation',
          askCheckTaskCompleted: 'Do you want to check this task as completed?',
          askDeletTask: 'Do you want to delete this task?',
          askRemoveCompleted: 'Do you want to remove this task from the completed list',
          search: 'Search',
          language: 'Language',
          addNewTask: 'Add new task',
          list: 'List',
          history: 'History',
          settings: 'Settings / Profile',
          title: 'Title',
          description: 'Description',
          save: 'Save',
          cancel: 'Cancel'
        }
      },
      fr: {
        translation: {
          confirm: 'confirmer',
          confirmation: 'Confirmation',
          askCheckTaskCompleted: 'Voulez-vous marquer cette tâche comme complète?',
          askDeletTask: 'Voulez-vous supprimer cette tâche?',
          askRemoveCompleted: 'Voulez-vous retirer cette tâche de la liste des complétées?',
          search: 'Chercher',
          language: 'Langue',
          addNewTask: 'Ajouter une nouvelle tâche',
          list: 'Liste',
          history: 'Historique',
          settings: 'Paramètres',
          title: 'Titre',
          description: 'Description',
          save: 'Enregistrer',
          cancel: 'Annuler'
        }
      },
      pt: {
        translation: {
          confirm: 'Confirmar',
          confirmation: 'Confirmação',
          askCheckTaskCompleted: 'Você quer marcar essa task como completa?',
          askDeletTask: 'Você quer excluir essa task?',
          askRemoveCompleted: 'Você quer remover essa task da lista das completas?',
          search: 'Pesquisar',
          language: 'Idioma',
          addNewTask: 'Adicionar nova task',
          list: 'Lista',
          history: 'Histórico',
          settings: 'Configurações',
          title: 'Titulo',
          description: 'Descrição',
          save: 'Salvar',
          cancel: 'Cancelar'
        }
      }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });
export const languages = [{name: 'Português', code: 'pt'}, {name: 'English', code: 'en'}, {name: 'Français', code: 'fr'}]

export default i18n;
