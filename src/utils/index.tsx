import { ChangeEvent,  SetStateAction } from "react";
import { Book} from "../Reducers/CartReducer";
import {toast} from "react-toastify";


  
    export const onChangeHandler = (e: ChangeEvent<HTMLInputElement>,setRecentSearches: (arg0: (prev: any) => any[]) => void,setSearchTerm: (arg0: any) => void,debounceVal: unknown) => {
       setSearchTerm(e.target.value)
       if(debounceVal && debounceVal!=""){
         setRecentSearches((prev: any) =>{
              return [...prev,debounceVal]}) 
            }
          };
 
    export  const filterCategories=(
      val: string,
      setFiltered: React.Dispatch<SetStateAction<Book[]>>,
      books: Book[],
      setSelected: React.Dispatch<SetStateAction<string | null>>
       )=>{
          if (val === "all") {
            setFiltered(books);
            setSelected("all");
            return;
          }
         
         if(setSelected) setSelected(val)
          const filteredArr = books.filter(book => {
            return book.volumeInfo?.categories?.includes(val);
          });
              console.log(filteredArr)
          setFiltered(filteredArr)
          
          }
  
        export  enum SortCriteria {
            TITLE_ASC = 'TITLE_ASC',
            TITLE_DESC = 'TITLE_DESC',
            DATE_ASC = 'DATE_ASC',
            DATE_DESC = 'DATE_DESC'
          }
          
  
          export const sortBooks = (books: Book[], criteria: SortCriteria): Book[] => {
            return [...books].sort((a, b) => {
              switch (criteria) {
                case SortCriteria.TITLE_ASC:
                  return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
                case SortCriteria.TITLE_DESC:
                  return b.volumeInfo.title.localeCompare(a.volumeInfo.title);
                case SortCriteria.DATE_ASC:
                  return new Date(a.volumeInfo.publishedDate || '').getTime() - new Date(b.volumeInfo.publishedDate || '').getTime();
                case SortCriteria.DATE_DESC:
                  return new Date(b.volumeInfo.publishedDate || '').getTime() - new Date(a.volumeInfo.publishedDate || '').getTime();
                default:
                  return 0;
              }
            });
          };    

        export const successToast = (text:string) => {
          toast.success(text, {
            position:"top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        };
         export const ErrorToast = (text:string) => {
          toast.error(text, {
            position:"top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        };

       