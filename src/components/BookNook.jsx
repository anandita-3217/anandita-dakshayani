// import { useState, useEffect, useCallback } from "react";
// import {
//   Box, Flex, Text, VStack, HStack, Button, IconButton,
//   Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
//   Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton,
//   FormControl, FormLabel, Input, Select, Textarea, Switch,
//   NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
//   Badge, Progress, Tabs, TabList, Tab, TabPanels, TabPanel,
//   useDisclosure, useColorModeValue, Tooltip, Wrap, WrapItem,
//   Stat, StatLabel, StatNumber, StatHelpText,
//   Grid, GridItem, Divider, useToast,
// } from "@chakra-ui/react";

// // ─── Constants ────────────────────────────────────────────────────────────────

// const GENRES = [
//   "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
//   "Biography", "History", "Self-Help", "Science",
//   "Philosophy", "Poetry", "Thriller", "Romance",
//   "Graphic Novel", "Other",
// ];

// const GENRE_COLORS = {
//   "Fiction": "#7C9885",
//   "Non-Fiction": "#8B7355",
//   "Science Fiction": "#5B7FA6",
//   "Fantasy": "#9B72CF",
//   "Biography": "#C4956A",
//   "History": "#A67C52",
//   "Self-Help": "#6BAE8E",
//   "Science": "#5B9BAE",
//   "Philosophy": "#7B8EA6",
//   "Poetry": "#C4789B",
//   "Thriller": "#8B4C4C",
//   "Romance": "#C47878",
//   "Graphic Novel": "#78A8C4",
//   "Other": "#8A8A8A",
// };

// const SPINE_COLORS = [
//   "#C4714A", "#4A7FA6", "#5A9E6F", "#9B6B4A",
//   "#7A5FA6", "#C49A4A", "#4A8A8A", "#C45A7A",
//   "#6A8A4A", "#4A5A9E", "#A64A6A", "#4A9E8A",
// ];

// const STORAGE_KEY = "book-nook-data";

// const DEFAULT_GOAL = { year: new Date().getFullYear(), target: 24 };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const uid = () => Math.random().toString(36).slice(2, 10);

// const getPaceMessage = (booksRead, target) => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), 0, 1);
//   const end = new Date(now.getFullYear(), 11, 31);
//   const elapsed = (now - start) / (end - start);
//   const expectedByNow = Math.floor(target * elapsed);
//   const diff = booksRead - expectedByNow;
//   if (diff > 1) return { msg: `${diff} books ahead of pace 🔥`, color: "green.400" };
//   if (diff < -1) return { msg: `${Math.abs(diff)} books behind pace 📖`, color: "orange.400" };
//   return { msg: "Right on pace ✨", color: "blue.400" };
// };

// const openGoogleReviews = (title, author) => {
//   window.open(
//     `https://www.google.com/search?q=${encodeURIComponent(title + " " + author + " book review")}`,
//     "_blank"
//   );
// };

// const openGoodreads = (title) => {
//   window.open(
//     `https://www.goodreads.com/search?q=${encodeURIComponent(title)}`,
//     "_blank"
//   );
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function StarRating({ value = 0, onChange, readOnly = false }) {
//   return (
//     <HStack spacing={1}>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Box
//           key={star}
//           as={readOnly ? "span" : "button"}
//           onClick={() => !readOnly && onChange(star)}
//           fontSize="20px"
//           cursor={readOnly ? "default" : "pointer"}
//           opacity={star <= value ? 1 : 0.25}
//           _hover={!readOnly ? { transform: "scale(1.2)" } : {}}
//           transition="all 0.15s"
//         >
//           ★
//         </Box>
//       ))}
//     </HStack>
//   );
// }

// function BookSpine({ book, onClick }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <Tooltip label={`${book.title} — ${book.author}`} placement="top" hasArrow>
//       <Box
//         w="36px"
//         h="220px"
//         bg={book.color}
//         borderRadius="3px 6px 6px 3px"
//         cursor="pointer"
//         position="relative"
//         onClick={() => onClick(book)}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         transform={hovered ? "translateY(-8px) scale(1.04)" : "translateY(0) scale(1)"}
//         transition="all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)"
//         boxShadow={
//           hovered
//             ? "4px 0 16px rgba(0,0,0,0.35), inset -2px 0 4px rgba(255,255,255,0.15)"
//             : "2px 0 8px rgba(0,0,0,0.25), inset -2px 0 4px rgba(255,255,255,0.1)"
//         }
//         flexShrink={0}
//         _before={{
//           content: '""',
//           position: "absolute",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           width: "4px",
//           borderRadius: "3px 0 0 3px",
//           background: "rgba(0,0,0,0.2)",
//         }}
//       >
//         {/* Spine text */}
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%, -50%) rotate(-90deg)"
//           width="200px"
//           textAlign="center"
//           pointerEvents="none"
//         >
//           <Text
//             fontSize="11px"
//             fontWeight="700"
//             color="rgba(255,255,255,0.95)"
//             letterSpacing="0.05em"
//             textTransform="uppercase"
//             noOfLines={1}
//             textShadow="0 1px 2px rgba(0,0,0,0.4)"
//           >
//             {book.title}
//           </Text>
//           <Text
//             fontSize="8px"
//             color="rgba(255,255,255,0.7)"
//             letterSpacing="0.03em"
//             noOfLines={1}
//             mt="1px"
//           >
//             {book.author}
//           </Text>
//         </Box>

//         {/* Top binding detail */}
//         <Box
//           position="absolute"
//           top="8px"
//           left="4px"
//           right="4px"
//           height="3px"
//           bg="rgba(255,255,255,0.2)"
//           borderRadius="1px"
//         />
//         <Box
//           position="absolute"
//           bottom="8px"
//           left="4px"
//           right="4px"
//           height="3px"
//           bg="rgba(255,255,255,0.2)"
//           borderRadius="1px"
//         />
//       </Box>
//     </Tooltip>
//   );
// }

// function EmptyShelfMessage({ label }) {
//   return (
//     <Box textAlign="center" py={12} opacity={0.5}>
//       <Text fontSize="40px" mb={2}>📚</Text>
//       <Text fontSize="sm" fontStyle="italic" color="inherit">{label}</Text>
//     </Box>
//   );
// }

// function Shelf({ books, onBookClick }) {
//   const woodTop = useColorModeValue("#C4A882", "#8B6E4E");
//   const woodSide = useColorModeValue("#A68B5B", "#6B4E2A");
//   const woodShelf = useColorModeValue("#D4B896", "#9B7A52");
//   const shelfBg = useColorModeValue("rgba(139,100,60,0.08)", "rgba(80,50,20,0.3)");

//   return (
//     <Box
//       position="relative"
//       bg={shelfBg}
//       borderRadius="8px"
//       p={4}
//       pb={0}
//       minH="280px"
//     >
//       {/* Back wall texture */}
//       <Box
//         position="absolute"
//         inset={0}
//         borderRadius="8px"
//         bgImage={`repeating-linear-gradient(
//           90deg,
//           transparent,
//           transparent 60px,
//           rgba(139,100,60,0.06) 60px,
//           rgba(139,100,60,0.06) 61px
//         )`}
//         pointerEvents="none"
//       />

//       {/* Books area */}
//       <Box
//         position="relative"
//         minH="220px"
//         px={2}
//       >
//         {books.length === 0 ? (
//           <EmptyShelfMessage label="No books here yet. Add your first one!" />
//         ) : (
//           <Flex
//             align="flex-end"
//             gap="6px"
//             flexWrap="wrap"
//             minH="220px"
//             pt={4}
//           >
//             {books.map((book) => (
//               <BookSpine key={book.id} book={book} onClick={onBookClick} />
//             ))}
//           </Flex>
//         )}
//       </Box>

//       {/* Shelf plank */}
//       <Box
//         h="18px"
//         bg={woodTop}
//         borderRadius="3px"
//         mt={1}
//         boxShadow={`0 4px 0 ${woodSide}, 0 8px 16px rgba(0,0,0,0.25)`}
//         position="relative"
//         _before={{
//           content: '""',
//           position: "absolute",
//           inset: 0,
//           borderRadius: "3px",
//           background: `linear-gradient(180deg, ${woodShelf} 0%, ${woodTop} 40%, rgba(0,0,0,0.1) 100%)`,
//         }}
//       />
//     </Box>
//   );
// }

// function YearlyGoalBanner({ books, goal, onEditGoal }) {
//   const booksRead = books.filter((b) => b.status === "read").length;
//   const pct = Math.min(100, Math.round((booksRead / goal.target) * 100));
//   const pace = getPaceMessage(booksRead, goal.target);
//   const bgGradient = useColorModeValue(
//     "linear(to-r, orange.50, amber.50)",
//     "linear(to-r, orange.900, yellow.900)"
//   );

//   return (
//     <Box
//       bgGradient={bgGradient}
//       border="1px solid"
//       borderColor={useColorModeValue("orange.200", "orange.700")}
//       borderRadius="xl"
//       p={5}
//       mb={6}
//     >
//       <Flex justify="space-between" align="flex-start" mb={3} wrap="wrap" gap={2}>
//         <Box>
//           <Text fontFamily="'Georgia', serif" fontSize="lg" fontWeight="700">
//             {goal.year} Reading Goal
//           </Text>
//           <Text fontSize="sm" color={pace.color} fontWeight="600" mt={0.5}>
//             {pace.msg}
//           </Text>
//         </Box>
//         <HStack>
//           <Stat textAlign="right">
//             <StatNumber fontSize="2xl" fontFamily="'Georgia', serif">
//               {booksRead}
//               <Text as="span" fontSize="lg" color="gray.500"> / {goal.target}</Text>
//             </StatNumber>
//             <StatLabel fontSize="xs">books read</StatLabel>
//           </Stat>
//           <Button size="xs" variant="ghost" onClick={onEditGoal} colorScheme="orange">
//             Edit goal
//           </Button>
//         </HStack>
//       </Flex>
//       <Progress
//         value={pct}
//         colorScheme="orange"
//         borderRadius="full"
//         size="sm"
//         bg={useColorModeValue("orange.100", "orange.900")}
//       />
//       <Text fontSize="xs" mt={1} color="gray.500" textAlign="right">{pct}% complete</Text>
//     </Box>
//   );
// }

// function GenreFilter({ selected, onChange }) {
//   return (
//     <Wrap spacing={2} mb={4}>
//       <WrapItem>
//         <Badge
//           px={3}
//           py={1}
//           borderRadius="full"
//           cursor="pointer"
//           colorScheme={selected === null ? "orange" : "gray"}
//           onClick={() => onChange(null)}
//           fontSize="xs"
//           variant={selected === null ? "solid" : "outline"}
//         >
//           All
//         </Badge>
//       </WrapItem>
//       {GENRES.map((g) => (
//         <WrapItem key={g}>
//           <Badge
//             px={3}
//             py={1}
//             borderRadius="full"
//             cursor="pointer"
//             colorScheme={selected === g ? "orange" : "gray"}
//             onClick={() => onChange(g === selected ? null : g)}
//             fontSize="xs"
//             variant={selected === g ? "solid" : "outline"}
//           >
//             {g}
//           </Badge>
//         </WrapItem>
//       ))}
//     </Wrap>
//   );
// }

// // ─── Add/Edit Drawer ──────────────────────────────────────────────────────────

// function AddBookDrawer({ isOpen, onClose, onSave, editBook }) {
//   const toast = useToast();
//   const blank = {
//     title: "", author: "", genre: GENRES[0],
//     status: "read", color: SPINE_COLORS[0],
//     recommend: false, dateFinished: "", rating: 0, note: "",
//   };
//   const [form, setForm] = useState(blank);

//   useEffect(() => {
//     setForm(editBook ? { ...blank, ...editBook } : blank);
//   }, [editBook, isOpen]);

//   const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const handleSubmit = () => {
//     if (!form.title.trim() || !form.author.trim()) {
//       toast({ title: "Title and author are required", status: "warning", duration: 2000 });
//       return;
//     }
//     onSave({
//       ...form,
//       id: editBook?.id || uid(),
//       dateAdded: editBook?.dateAdded || new Date().toISOString(),
//     });
//     onClose();
//   };

//   return (
//     <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
//       <DrawerOverlay />
//       <DrawerContent>
//         <DrawerCloseButton />
//         <DrawerHeader fontFamily="'Georgia', serif" borderBottomWidth="1px">
//           {editBook ? "Edit Book" : "Add a Book"}
//         </DrawerHeader>

//         <DrawerBody py={6}>
//           <VStack spacing={5} align="stretch">
//             <FormControl isRequired>
//               <FormLabel fontSize="sm">Title</FormLabel>
//               <Input value={form.title} onChange={(e) => set("title", e.target.value)}
//                 placeholder="e.g. The Name of the Wind" />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel fontSize="sm">Author</FormLabel>
//               <Input value={form.author} onChange={(e) => set("author", e.target.value)}
//                 placeholder="e.g. Patrick Rothfuss" />
//             </FormControl>

//             <FormControl>
//               <FormLabel fontSize="sm">Genre</FormLabel>
//               <Select value={form.genre} onChange={(e) => set("genre", e.target.value)}>
//                 {GENRES.map((g) => <option key={g}>{g}</option>)}
//               </Select>
//             </FormControl>

//             <FormControl>
//               <FormLabel fontSize="sm">Status</FormLabel>
//               <HStack>
//                 {["read", "want-to-read"].map((s) => (
//                   <Button
//                     key={s}
//                     size="sm"
//                     variant={form.status === s ? "solid" : "outline"}
//                     colorScheme="orange"
//                     onClick={() => set("status", s)}
//                   >
//                     {s === "read" ? "✅ Read" : "🔖 Want to Read"}
//                   </Button>
//                 ))}
//               </HStack>
//             </FormControl>

//             <FormControl>
//               <FormLabel fontSize="sm">Spine Color</FormLabel>
//               <HStack flexWrap="wrap" gap={2}>
//                 {SPINE_COLORS.map((c) => (
//                   <Box
//                     key={c}
//                     w="28px" h="28px"
//                     bg={c}
//                     borderRadius="6px"
//                     cursor="pointer"
//                     border={form.color === c ? "3px solid" : "3px solid transparent"}
//                     borderColor={form.color === c ? "orange.400" : "transparent"}
//                     onClick={() => set("color", c)}
//                     _hover={{ transform: "scale(1.15)" }}
//                     transition="all 0.15s"
//                   />
//                 ))}
//                 <Input
//                   type="color"
//                   w="28px"
//                   h="28px"
//                   p={0}
//                   border="none"
//                   cursor="pointer"
//                   borderRadius="6px"
//                   value={form.color}
//                   onChange={(e) => set("color", e.target.value)}
//                   title="Custom color"
//                 />
//               </HStack>
//             </FormControl>

//             {form.status === "read" && (
//               <>
//                 <FormControl>
//                   <FormLabel fontSize="sm">Date Finished</FormLabel>
//                   <Input
//                     type="date"
//                     value={form.dateFinished}
//                     onChange={(e) => set("dateFinished", e.target.value)}
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel fontSize="sm">Rating</FormLabel>
//                   <StarRating value={form.rating} onChange={(v) => set("rating", v)} />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel fontSize="sm">Recommend?</FormLabel>
//                   <Switch
//                     isChecked={form.recommend}
//                     onChange={(e) => set("recommend", e.target.checked)}
//                     colorScheme="orange"
//                   />
//                 </FormControl>
//               </>
//             )}

//             <FormControl>
//               <FormLabel fontSize="sm">Notes / Teaser</FormLabel>
//               <Textarea
//                 value={form.note}
//                 onChange={(e) => set("note", e.target.value)}
//                 placeholder="A quick thought about this book..."
//                 rows={3}
//                 resize="none"
//               />
//             </FormControl>
//           </VStack>
//         </DrawerBody>

//         <DrawerFooter borderTopWidth="1px" gap={3}>
//           <Button variant="ghost" onClick={onClose}>Cancel</Button>
//           <Button colorScheme="orange" onClick={handleSubmit}>
//             {editBook ? "Save Changes" : "Add to Shelf"}
//           </Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }

// // ─── Book Detail Modal ────────────────────────────────────────────────────────

// function BookDetailModal({ book, isOpen, onClose, onEdit, onDelete }) {
//   if (!book) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
//       <ModalOverlay backdropFilter="blur(4px)" />
//       <ModalContent borderRadius="xl" overflow="hidden">
//         {/* Colored header band */}
//         <Box h="6px" bg={book.color} />
//         <ModalHeader pt={5} fontFamily="'Georgia', serif">
//           {book.title}
//         </ModalHeader>
//         <ModalCloseButton />

//         <ModalBody pb={6}>
//           <Text fontSize="sm" color="gray.500" mb={3}>by {book.author}</Text>

//           <HStack mb={4} flexWrap="wrap" gap={2}>
//             <Badge
//               px={3}
//               py={1}
//               borderRadius="full"
//               bg={GENRE_COLORS[book.genre] || "#8A8A8A"}
//               color="white"
//               fontSize="xs"
//             >
//               {book.genre}
//             </Badge>
//             <Badge
//               colorScheme={book.status === "read" ? "green" : "blue"}
//               borderRadius="full"
//               px={3}
//               py={1}
//               fontSize="xs"
//             >
//               {book.status === "read" ? "✅ Read" : "🔖 Want to Read"}
//             </Badge>
//             {book.recommend && (
//               <Badge colorScheme="orange" borderRadius="full" px={3} py={1} fontSize="xs">
//                 👍 Recommended
//               </Badge>
//             )}
//           </HStack>

//           {book.rating > 0 && (
//             <Box mb={3}>
//               <StarRating value={book.rating} readOnly />
//             </Box>
//           )}

//           {book.dateFinished && (
//             <Text fontSize="xs" color="gray.500" mb={3}>
//               Finished: {new Date(book.dateFinished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
//             </Text>
//           )}

//           {book.note && (
//             <Box
//               bg={useColorModeValue("gray.50", "gray.700")}
//               borderRadius="md"
//               p={3}
//               mb={4}
//               borderLeft="3px solid"
//               borderLeftColor="orange.300"
//             >
//               <Text fontSize="sm" fontStyle="italic">{book.note}</Text>
//             </Box>
//           )}

//           <Divider mb={4} />

//           <VStack spacing={2} align="stretch">
//             <Button
//               size="sm"
//               variant="outline"
//               leftIcon={<Text>🔍</Text>}
//               onClick={() => openGoogleReviews(book.title, book.author)}
//             >
//               Google Reviews
//             </Button>
//             <Button
//               size="sm"
//               variant="outline"
//               leftIcon={<Text>📗</Text>}
//               onClick={() => openGoodreads(book.title)}
//             >
//               Find on Goodreads
//             </Button>
//           </VStack>
//         </ModalBody>

//         <ModalFooter borderTopWidth="1px" gap={3} justifyContent="space-between">
//           <Button
//             size="sm"
//             colorScheme="red"
//             variant="ghost"
//             onClick={() => { onDelete(book.id); onClose(); }}
//           >
//             Delete
//           </Button>
//           <HStack>
//             <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
//             <Button size="sm" colorScheme="orange" onClick={() => { onClose(); onEdit(book); }}>
//               Edit
//             </Button>
//           </HStack>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

// // ─── Goal Edit Modal ──────────────────────────────────────────────────────────

// function GoalModal({ isOpen, onClose, goal, onSave }) {
//   const [target, setTarget] = useState(goal.target);

//   useEffect(() => { setTarget(goal.target); }, [goal]);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
//       <ModalOverlay />
//       <ModalContent borderRadius="xl">
//         <ModalHeader fontFamily="'Georgia', serif">Set Reading Goal</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <FormControl>
//             <FormLabel fontSize="sm">Books to read in {goal.year}</FormLabel>
//             <NumberInput
//               value={target}
//               onChange={(_, v) => setTarget(v)}
//               min={1}
//               max={365}
//             >
//               <NumberInputField />
//               <NumberInputStepper>
//                 <NumberIncrementStepper />
//                 <NumberDecrementStepper />
//               </NumberInputStepper>
//             </NumberInput>
//           </FormControl>
//         </ModalBody>
//         <ModalFooter gap={3}>
//           <Button variant="ghost" onClick={onClose}>Cancel</Button>
//           <Button colorScheme="orange" onClick={() => { onSave(target); onClose(); }}>
//             Save Goal
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function BookNook() {
//   const [books, setBooks] = useState([]);
//   const [goal, setGoal] = useState(DEFAULT_GOAL);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [editBook, setEditBook] = useState(null);
//   const [genreFilter, setGenreFilter] = useState(null);

//   const addDrawer = useDisclosure();
//   const detailModal = useDisclosure();
//   const goalModal = useDisclosure();
//   const toast = useToast();

//   // Load from localStorage
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) {
//         const { books: b, goal: g } = JSON.parse(raw);
//         if (b) setBooks(b);
//         if (g) setGoal(g);
//       }
//     } catch {}
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify({ books, goal }));
//   }, [books, goal]);

//   const handleSaveBook = useCallback((book) => {
//     setBooks((prev) => {
//       const idx = prev.findIndex((b) => b.id === book.id);
//       if (idx >= 0) {
//         const next = [...prev];
//         next[idx] = book;
//         return next;
//       }
//       return [...prev, book];
//     });
//     toast({
//       title: editBook ? "Book updated!" : "Book added to shelf!",
//       status: "success",
//       duration: 2000,
//       isClosable: true,
//     });
//     setEditBook(null);
//   }, [editBook, toast]);

//   const handleDeleteBook = useCallback((id) => {
//     setBooks((prev) => prev.filter((b) => b.id !== id));
//     toast({ title: "Book removed", status: "info", duration: 2000 });
//   }, [toast]);

//   const handleSpineClick = (book) => {
//     setSelectedBook(book);
//     detailModal.onOpen();
//   };

//   const handleEditFromModal = (book) => {
//     setEditBook(book);
//     addDrawer.onOpen();
//   };

//   const openAdd = () => {
//     setEditBook(null);
//     addDrawer.onOpen();
//   };

//   const filterBooks = (statusFilter) => {
//     let filtered = books.filter((b) => b.status === statusFilter);
//     if (statusFilter === "recommended") {
//       filtered = books.filter((b) => b.recommend);
//     }
//     if (genreFilter) filtered = filtered.filter((b) => b.genre === genreFilter);
//     return filtered;
//   };

//   const bg = useColorModeValue("white", "gray.900");
//   const headingColor = useColorModeValue("gray.800", "gray.100");

//   return (
//     <Box
//       bg={bg}
//       borderRadius="2xl"
//       border="1px solid"
//       borderColor={useColorModeValue("gray.200", "gray.700")}
//       p={{ base: 4, md: 8 }}
//       maxW="900px"
//       mx="auto"
//       fontFamily="system-ui, sans-serif"
//     >
//       {/* Header */}
//       <Flex justify="space-between" align="center" mb={6}>
//         <Box>
//           <Text
//             fontFamily="'Georgia', serif"
//             fontSize={{ base: "2xl", md: "3xl" }}
//             fontWeight="700"
//             color={headingColor}
//             letterSpacing="-0.02em"
//           >
//             📚 Book Nook
//           </Text>
//           <Text fontSize="sm" color="gray.500" mt={0.5}>
//             My reading life, shelved.
//           </Text>
//         </Box>
//         <Button
//           colorScheme="orange"
//           size="md"
//           borderRadius="full"
//           leftIcon={<Text fontSize="md">＋</Text>}
//           onClick={openAdd}
//           fontWeight="700"
//         >
//           Add Book
//         </Button>
//       </Flex>

//       {/* Goal Banner */}
//       <YearlyGoalBanner
//         books={books}
//         goal={goal}
//         onEditGoal={goalModal.onOpen}
//       />

//       {/* Genre Filter */}
//       <GenreFilter selected={genreFilter} onChange={setGenreFilter} />

//       {/* Tabs */}
//       <Tabs colorScheme="orange" variant="soft-rounded">
//         <TabList mb={4} gap={2} flexWrap="wrap">
//           <Tab fontSize="sm" fontWeight="600">✅ Read ({books.filter(b => b.status === "read").length})</Tab>
//           <Tab fontSize="sm" fontWeight="600">🔖 Want to Read ({books.filter(b => b.status === "want-to-read").length})</Tab>
//           <Tab fontSize="sm" fontWeight="600">👍 Recommended ({books.filter(b => b.recommend).length})</Tab>
//         </TabList>

//         <TabPanels>
//           <TabPanel px={0}>
//             <Shelf
//               books={filterBooks("read")}
//               onBookClick={handleSpineClick}
//             />
//           </TabPanel>
//           <TabPanel px={0}>
//             <Shelf
//               books={filterBooks("want-to-read")}
//               onBookClick={handleSpineClick}
//             />
//           </TabPanel>
//           <TabPanel px={0}>
//             <Shelf
//               books={books.filter(b => b.recommend && (!genreFilter || b.genre === genreFilter))}
//               onBookClick={handleSpineClick}
//             />
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//       {/* Empty state CTA */}
//       {books.length === 0 && (
//         <Box textAlign="center" mt={4}>
//           <Button
//             variant="link"
//             colorScheme="orange"
//             fontSize="sm"
//             onClick={openAdd}
//           >
//             Add your first book to fill the shelf →
//           </Button>
//         </Box>
//       )}

//       {/* Drawers & Modals */}
//       <AddBookDrawer
//         isOpen={addDrawer.isOpen}
//         onClose={() => { addDrawer.onClose(); setEditBook(null); }}
//         onSave={handleSaveBook}
//         editBook={editBook}
//       />

//       <BookDetailModal
//         book={selectedBook}
//         isOpen={detailModal.isOpen}
//         onClose={detailModal.onClose}
//         onEdit={handleEditFromModal}
//         onDelete={handleDeleteBook}
//       />

//       <GoalModal
//         isOpen={goalModal.isOpen}
//         onClose={goalModal.onClose}
//         goal={goal}
//         onSave={(t) => setGoal((g) => ({ ...g, target: t }))}
//       />
//     </Box>
//   );
// }

// TODO: change the vibe to fit the vibe of the portfolio project
// TODO: Make a distinction btw admin - me and everyone else no one but me can edit the content
// TODO: MAke the editability thing for all the other stuff too
// TODO: Add a tooltip on themetoggle and commandpalette to show shortcuts


import { useState, useEffect, useCallback } from "react";
import {
  Box, Flex, Text, VStack, HStack, Button, IconButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton,
  FormControl, FormLabel, Input, Select, Textarea, Switch,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Badge, Progress, Tabs, TabList, Tab, TabPanels, TabPanel,
  useDisclosure, useColorModeValue, Tooltip, Wrap, WrapItem,
  Stat, StatLabel, StatNumber,
  Divider, useToast,
} from "@chakra-ui/react";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const H    = "'Orbitron', sans-serif";
const B    = "'Sora', sans-serif";
const MONO = "'JetBrains Mono', monospace";

// ─── Constants (untouched) ────────────────────────────────────────────────────
const GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
  "Biography", "History", "Self-Help", "Science",
  "Philosophy", "Poetry", "Thriller", "Romance",
  "Graphic Novel", "Other",
];

const GENRE_COLORS = {
  "Fiction": "#7C9885", "Non-Fiction": "#8B7355",
  "Science Fiction": "#5B7FA6", "Fantasy": "#9B72CF",
  "Biography": "#C4956A", "History": "#A67C52",
  "Self-Help": "#6BAE8E", "Science": "#5B9BAE",
  "Philosophy": "#7B8EA6", "Poetry": "#C4789B",
  "Thriller": "#8B4C4C", "Romance": "#C47878",
  "Graphic Novel": "#78A8C4", "Other": "#8A8A8A",
};

const SPINE_COLORS = [
  "#C4714A", "#4A7FA6", "#5A9E6F", "#9B6B4A",
  "#7A5FA6", "#C49A4A", "#4A8A8A", "#C45A7A",
  "#6A8A4A", "#4A5A9E", "#A64A6A", "#4A9E8A",
];

const STORAGE_KEY = "book-nook-data";
const DEFAULT_GOAL = { year: new Date().getFullYear(), target: 24 };

// ─── Helpers (untouched) ──────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);

const getPaceMessage = (booksRead, target) => {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end   = new Date(now.getFullYear(), 11, 31);
  const elapsed = (now - start) / (end - start);
  const expectedByNow = Math.floor(target * elapsed);
  const diff = booksRead - expectedByNow;
  if (diff > 1)  return { msg: `${diff} books ahead of pace 🔥`,          color: "#14b8a6" };
  if (diff < -1) return { msg: `${Math.abs(diff)} books behind pace 📖`,  color: "#f4845f" };
  return           { msg: "Right on pace ✨",                              color: "#7c3aed" };
};

const openGoogleReviews = (title, author) =>
  window.open(`https://www.google.com/search?q=${encodeURIComponent(title + " " + author + " book review")}`, "_blank");

const openGoodreads = (title) =>
  window.open(`https://www.goodreads.com/search?q=${encodeURIComponent(title)}`, "_blank");

// ─── Star rating (restyled) ───────────────────────────────────────────────────
function StarRating({ value = 0, onChange, readOnly = false }) {
  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box key={star}
          as={readOnly ? "span" : "button"}
          onClick={() => !readOnly && onChange(star)}
          fontSize="18px" cursor={readOnly ? "default" : "pointer"}
          color={star <= value ? "#7c3aed" : "transparent"}
          textShadow={star <= value ? "0 0 8px rgba(124,58,237,0.6)" : "none"}
          style={{ WebkitTextStroke: star <= value ? "0" : "1px rgba(124,58,237,0.35)" }}
          _hover={!readOnly ? { transform: "scale(1.2)", color: "#7c3aed" } : {}}
          transition="all 0.15s"
        >★</Box>
      ))}
    </HStack>
  );
}

// ─── Book Spine (restyled hover glow) ────────────────────────────────────────
function BookSpine({ book, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Tooltip label={`${book.title} — ${book.author}`} placement="top" hasArrow
      bg="rgba(10,10,10,0.9)" color="white" fontFamily={MONO} fontSize="10px"
      borderRadius="8px" border="1px solid rgba(255,255,255,0.08)">
      <Box
        w="36px" h="220px" bg={book.color}
        borderRadius="3px 6px 6px 3px"
        cursor="pointer" position="relative"
        onClick={() => onClick(book)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        transform={hovered ? "translateY(-10px) scale(1.06)" : "translateY(0) scale(1)"}
        transition="all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)"
        boxShadow={hovered
          ? `4px 0 20px ${book.color}66, 0 0 32px ${book.color}33, inset -2px 0 4px rgba(255,255,255,0.15)`
          : "2px 0 8px rgba(0,0,0,0.25), inset -2px 0 4px rgba(255,255,255,0.1)"}
        flexShrink={0}
        _before={{
          content: '""', position: "absolute", left: 0, top: 0, bottom: 0,
          width: "4px", borderRadius: "3px 0 0 3px", background: "rgba(0,0,0,0.2)",
        }}
      >
        <Box position="absolute" top="50%" left="50%"
          transform="translate(-50%, -50%) rotate(-90deg)"
          width="200px" textAlign="center" pointerEvents="none">
          <Text fontSize="11px" fontWeight="700" color="rgba(255,255,255,0.95)"
            fontFamily={H} letterSpacing="0.05em" textTransform="uppercase"
            noOfLines={1} textShadow="0 1px 2px rgba(0,0,0,0.4)">{book.title}</Text>
          <Text fontSize="8px" color="rgba(255,255,255,0.65)" fontFamily={B}
            letterSpacing="0.03em" noOfLines={1} mt="1px">{book.author}</Text>
        </Box>
        <Box position="absolute" top="8px" left="4px" right="4px"
          height="3px" bg="rgba(255,255,255,0.2)" borderRadius="1px" />
        <Box position="absolute" bottom="8px" left="4px" right="4px"
          height="3px" bg="rgba(255,255,255,0.2)" borderRadius="1px" />
      </Box>
    </Tooltip>
  );
}

// ─── Empty shelf ──────────────────────────────────────────────────────────────
function EmptyShelfMessage({ label }) {
  const subColor = useColorModeValue("gray.400", "whiteAlpha.400");
  return (
    <Box textAlign="center" py={12}>
      <Text fontFamily={MONO} fontSize="10px" letterSpacing="0.25em"
        textTransform="uppercase" color={subColor} mb={2}>
        // empty shelf
      </Text>
      <Text fontFamily={B} fontSize="13px" color={subColor} fontStyle="italic">{label}</Text>
    </Box>
  );
}

// ─── Shelf (wood restyled to match dark glass aesthetic) ──────────────────────
function Shelf({ books, onBookClick }) {
  const shelfBg    = useColorModeValue("rgba(0,0,0,0.03)",   "rgba(255,255,255,0.02)");
  const shelfBdr   = useColorModeValue("rgba(0,0,0,0.07)",   "rgba(255,255,255,0.06)");
  const plankBg    = useColorModeValue("rgba(0,0,0,0.06)",   "rgba(255,255,255,0.04)");
  const plankShadow= useColorModeValue("0 4px 0 rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.06)",
                                       "0 4px 0 rgba(0,0,0,0.4),  0 8px 20px rgba(0,0,0,0.3)");
  return (
    <Box position="relative" bg={shelfBg}
      border="1px solid" borderColor={shelfBdr}
      borderRadius="12px" p={4} pb={0} minH="280px"
      backdropFilter="blur(10px)">
      <Box position="relative" minH="220px" px={2}>
        {books.length === 0
          ? <EmptyShelfMessage label="No books here yet. Add your first one!" />
          : (
            <Flex align="flex-end" gap="6px" flexWrap="wrap" minH="220px" pt={4}>
              {books.map((book) => (
                <BookSpine key={book.id} book={book} onClick={onBookClick} />
              ))}
            </Flex>
          )}
      </Box>
      {/* Shelf plank */}
      <Box h="14px" bg={plankBg} borderRadius="3px" mt={1}
        boxShadow={plankShadow}
        borderTop="1px solid" borderColor={shelfBdr} />
    </Box>
  );
}

// ─── Yearly goal banner ───────────────────────────────────────────────────────
function YearlyGoalBanner({ books, goal, onEditGoal }) {
  const booksRead = books.filter((b) => b.status === "read").length;
  const pct       = Math.min(100, Math.round((booksRead / goal.target) * 100));
  const pace      = getPaceMessage(booksRead, goal.target);

  const cardBg    = useColorModeValue("rgba(255,255,255,0.7)",  "rgba(10,10,10,0.6)");
  const cardBdr   = useColorModeValue("rgba(0,0,0,0.08)",       "rgba(255,255,255,0.07)");
  const subColor  = useColorModeValue("gray.400",               "whiteAlpha.350");
  const numColor  = useColorModeValue("gray.700",               "whiteAlpha.800");

  return (
    <Box bg={cardBg} border="1px solid" borderColor={cardBdr}
      borderRadius="16px" p={5} mb={8}
      backdropFilter="blur(10px)" position="relative" overflow="hidden">
      {/* Top hairline */}
      <Box position="absolute" top={0} left="10%" right="10%" h="1px"
        background="linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)" />

      <Flex justify="space-between" align="flex-start" mb={4} wrap="wrap" gap={3}>
        <Box>
          <HStack spacing={3} mb={1}>
            <Box w="16px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily={MONO} fontSize="8px" letterSpacing="0.25em"
              textTransform="uppercase" color={subColor}>
              {goal.year} Reading Goal
            </Text>
          </HStack>
          <Text fontFamily={MONO} fontSize="11px" color={pace.color} letterSpacing="0.05em">
            {pace.msg}
          </Text>
        </Box>
        <HStack align="center" spacing={3}>
          <Text fontFamily={H} fontSize={{ base: "22px", md: "28px" }}
            fontWeight="900" color={numColor} lineHeight={1}>
            {booksRead}
            <Text as="span" fontFamily={MONO} fontSize="13px"
              color={subColor} ml={1}>/ {goal.target}</Text>
          </Text>
          <Box as="button" onClick={onEditGoal}
            fontFamily={MONO} fontSize="8px" letterSpacing="0.15em"
            textTransform="uppercase" color="#7c3aed"
            border="1px solid rgba(124,58,237,0.3)" borderRadius="6px"
            px={3} py={1} cursor="pointer"
            _hover={{ bg: "rgba(124,58,237,0.08)" }}
            transition="all 0.2s">
            Edit
          </Box>
        </HStack>
      </Flex>

      {/* Progress bar */}
      <Box h="3px" bg={useColorModeValue("rgba(0,0,0,0.06)", "rgba(255,255,255,0.05)")}
        borderRadius="full" overflow="hidden">
        <Box h="full" w={`${pct}%`} borderRadius="full"
          bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
          transition="width 0.8s cubic-bezier(0.16, 1, 0.3, 1)" />
      </Box>
      <Text fontFamily={MONO} fontSize="9px" mt={1.5} color={subColor} textAlign="right">
        {pct}% complete
      </Text>
    </Box>
  );
}

// ─── Genre filter ─────────────────────────────────────────────────────────────
function GenreFilter({ selected, onChange }) {
  const baseBg    = useColorModeValue("rgba(0,0,0,0.04)",       "rgba(255,255,255,0.04)");
  const baseBdr   = useColorModeValue("rgba(0,0,0,0.10)",       "rgba(255,255,255,0.08)");
  const baseColor = useColorModeValue("gray.500",               "whiteAlpha.500");

  return (
    <Wrap spacing={2} mb={6}>
      {[null, ...GENRES].map((g) => {
        const active = selected === g;
        return (
          <WrapItem key={g ?? "__all"}>
            <Box as="button"
              onClick={() => onChange(g === selected ? null : g)}
              fontFamily={MONO} fontSize="8px" letterSpacing="0.15em"
              textTransform="uppercase" px={3} py={1.5} borderRadius="6px"
              border="1px solid"
              borderColor={active ? "rgba(124,58,237,0.5)" : baseBdr}
              bg={active ? "rgba(124,58,237,0.1)" : baseBg}
              color={active ? "#7c3aed" : baseColor}
              cursor="pointer" transition="all 0.2s"
              _hover={{ borderColor: "rgba(124,58,237,0.4)", color: "#7c3aed" }}>
              {g ?? "All"}
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}

// ─── Add/Edit Drawer (restyled) ───────────────────────────────────────────────
function AddBookDrawer({ isOpen, onClose, onSave, editBook }) {
  const toast = useToast();
  const blank = {
    title: "", author: "", genre: GENRES[0],
    status: "read", color: SPINE_COLORS[0],
    recommend: false, dateFinished: "", rating: 0, note: "",
  };
  const [form, setForm] = useState(blank);

  useEffect(() => { setForm(editBook ? { ...blank, ...editBook } : blank); }, [editBook, isOpen]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.author.trim()) {
      toast({ title: "Title and author are required", status: "warning", duration: 2000 }); return;
    }
    onSave({ ...form, id: editBook?.id || uid(), dateAdded: editBook?.dateAdded || new Date().toISOString() });
    onClose();
  };

  const drawerBg  = useColorModeValue("rgba(248,248,250,0.97)", "rgba(8,8,8,0.97)");
  const bdrColor  = useColorModeValue("rgba(0,0,0,0.08)",       "rgba(255,255,255,0.07)");
  const labelCol  = useColorModeValue("gray.500",               "whiteAlpha.500");
  const inputSx   = {
    fontFamily: B, fontSize: "13px", borderRadius: "10px",
    bg: useColorModeValue("white", "rgba(255,255,255,0.03)"),
    borderColor: useColorModeValue("rgba(0,0,0,0.12)", "rgba(255,255,255,0.08)"),
    _focus: { borderColor: "#7c3aed", boxShadow: "0 0 0 1px #7c3aed" },
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay bg="rgba(0,0,0,0.6)" backdropFilter="blur(12px)" />
      <DrawerContent bg={drawerBg} backdropFilter="blur(20px)"
        border="1px solid" borderColor={bdrColor}>
        <Box h="2px" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" />
        <DrawerCloseButton color={labelCol} _hover={{ color: "white", bg: "rgba(255,255,255,0.06)" }} />
        <DrawerHeader borderBottom="1px solid" borderColor={bdrColor} pb={4} pt={5}>
          <HStack spacing={3}>
            <Box w="16px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily={H} fontSize="13px" letterSpacing="0.05em">
              {editBook ? "Edit Book" : "Add a Book"}
            </Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody py={6}>
          <VStack spacing={5} align="stretch">
            {[["Title", "title", "e.g. The Name of the Wind"], ["Author", "author", "e.g. Patrick Rothfuss"]].map(([lbl, key, ph]) => (
              <FormControl key={key} isRequired>
                <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                  textTransform="uppercase" color={labelCol}>{lbl}</FormLabel>
                <Input {...inputSx} value={form[key]}
                  onChange={(e) => set(key, e.target.value)} placeholder={ph} />
              </FormControl>
            ))}

            <FormControl>
              <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                textTransform="uppercase" color={labelCol}>Genre</FormLabel>
              <Select {...inputSx} value={form.genre} onChange={(e) => set("genre", e.target.value)}>
                {GENRES.map((g) => <option key={g}>{g}</option>)}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                textTransform="uppercase" color={labelCol}>Status</FormLabel>
              <HStack>
                {[["read", "✅ Read"], ["want-to-read", "🔖 Want to Read"]].map(([s, label]) => (
                  <Box key={s} as="button" onClick={() => set("status", s)}
                    fontFamily={MONO} fontSize="9px" letterSpacing="0.12em"
                    px={4} py={2} borderRadius="8px" border="1px solid"
                    borderColor={form.status === s ? "rgba(124,58,237,0.5)" : bdrColor}
                    bg={form.status === s ? "rgba(124,58,237,0.12)" : "transparent"}
                    color={form.status === s ? "#7c3aed" : labelCol}
                    cursor="pointer" transition="all 0.2s">{label}</Box>
                ))}
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                textTransform="uppercase" color={labelCol}>Spine Color</FormLabel>
              <HStack flexWrap="wrap" gap={2}>
                {SPINE_COLORS.map((c) => (
                  <Box key={c} w="26px" h="26px" bg={c} borderRadius="6px" cursor="pointer"
                    border={form.color === c ? "2px solid #7c3aed" : "2px solid transparent"}
                    boxShadow={form.color === c ? `0 0 8px ${c}88` : "none"}
                    onClick={() => set("color", c)}
                    _hover={{ transform: "scale(1.15)" }} transition="all 0.15s" />
                ))}
                <Input type="color" w="26px" h="26px" p={0} border="none"
                  cursor="pointer" borderRadius="6px"
                  value={form.color} onChange={(e) => set("color", e.target.value)} />
              </HStack>
            </FormControl>

            {form.status === "read" && (
              <>
                <FormControl>
                  <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                    textTransform="uppercase" color={labelCol}>Date Finished</FormLabel>
                  <Input {...inputSx} type="date" value={form.dateFinished}
                    onChange={(e) => set("dateFinished", e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                    textTransform="uppercase" color={labelCol}>Rating</FormLabel>
                  <StarRating value={form.rating} onChange={(v) => set("rating", v)} />
                </FormControl>
                <FormControl>
                  <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                    textTransform="uppercase" color={labelCol}>Recommend?</FormLabel>
                  <Switch isChecked={form.recommend}
                    onChange={(e) => set("recommend", e.target.checked)}
                    colorScheme="purple" />
                </FormControl>
              </>
            )}

            <FormControl>
              <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
                textTransform="uppercase" color={labelCol}>Notes</FormLabel>
              <Textarea {...inputSx} value={form.note}
                onChange={(e) => set("note", e.target.value)}
                placeholder="A quick thought about this book..." rows={3} resize="none" />
            </FormControl>
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTop="1px solid" borderColor={bdrColor} gap={3}>
          <Box as="button" onClick={onClose}
            fontFamily={MONO} fontSize="9px" letterSpacing="0.15em" textTransform="uppercase"
            px={4} py={2} borderRadius="8px" border="1px solid" borderColor={bdrColor}
            color={labelCol} cursor="pointer" _hover={{ borderColor: "#7c3aed" }} transition="all 0.2s">
            Cancel
          </Box>
          <Box as="button" onClick={handleSubmit}
            fontFamily={MONO} fontSize="9px" letterSpacing="0.15em" textTransform="uppercase"
            px={5} py={2} borderRadius="8px"
            bg="rgba(124,58,237,0.12)" border="1px solid rgba(124,58,237,0.4)" color="#7c3aed"
            cursor="pointer" _hover={{ bg: "rgba(124,58,237,0.2)" }} transition="all 0.2s">
            {editBook ? "Save Changes" : "Add to Shelf"}
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// ─── Book detail modal (restyled) ─────────────────────────────────────────────
function BookDetailModal({ book, isOpen, onClose, onEdit, onDelete }) {
  const modalBg   = useColorModeValue("rgba(248,248,250,0.97)", "rgba(8,8,8,0.97)");
  const modalBdr  = useColorModeValue("rgba(0,0,0,0.09)",       "rgba(255,255,255,0.08)");
  const hdrBdr    = useColorModeValue("rgba(0,0,0,0.07)",       "rgba(255,255,255,0.06)");
  const titleCol  = useColorModeValue("gray.800",               "rgba(255,255,255,0.92)");
  const subColor  = useColorModeValue("gray.500",               "whiteAlpha.450");
  const fieldBg   = useColorModeValue("rgba(0,0,0,0.025)",      "rgba(255,255,255,0.03)");
  const fieldBdr  = useColorModeValue("rgba(0,0,0,0.08)",       "rgba(255,255,255,0.06)");
  const monoColor = useColorModeValue("gray.500",               "whiteAlpha.400");

  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="rgba(0,0,0,0.72)" backdropFilter="blur(14px)" />
      <ModalContent bg={modalBg} backdropFilter="blur(20px)"
        border="1px solid" borderColor={modalBdr} borderRadius="18px"
        mx={4} boxShadow="0 40px 80px rgba(0,0,0,0.5)" overflow="hidden">
        {/* Colored top stripe */}
        <Box h="3px"
          style={{ background: `linear-gradient(to right, ${book.color}, ${book.color}55, transparent)` }} />

        <ModalHeader borderBottom="1px solid" borderColor={hdrBdr} pb={4} pt={5}>
          <HStack spacing={3} align="start">
            <Box w="10px" h="10px" borderRadius="2px" bg={book.color} flexShrink={0} mt={1.5} />
            <Box>
              <Text fontFamily={H} fontSize="13px" fontWeight="700" color={titleCol} noOfLines={2}>
                {book.title}
              </Text>
              <Text fontFamily={B} fontSize="12px" color={book.color} fontWeight="600" mt={0.5}>
                {book.author}
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={subColor} _hover={{ color: titleCol, bg: fieldBg }} borderRadius="8px" />

        <ModalBody py={5}>
          <HStack mb={4} flexWrap="wrap" gap={2}>
            <Box px={2.5} py={1} borderRadius="5px" fontFamily={MONO} fontSize="8px"
              letterSpacing="0.15em" textTransform="uppercase"
              bg={`${GENRE_COLORS[book.genre] || "#8A8A8A"}18`}
              color={GENRE_COLORS[book.genre] || "#8A8A8A"}
              border={`1px solid ${GENRE_COLORS[book.genre] || "#8A8A8A"}35`}>
              {book.genre}
            </Box>
            <Box px={2.5} py={1} borderRadius="5px" fontFamily={MONO} fontSize="8px"
              letterSpacing="0.15em" textTransform="uppercase"
              bg={book.status === "read" ? "rgba(20,184,166,0.1)" : "rgba(59,130,246,0.1)"}
              color={book.status === "read" ? "#14b8a6" : "#3b82f6"}
              border={`1px solid ${book.status === "read" ? "rgba(20,184,166,0.3)" : "rgba(59,130,246,0.3)"}`}>
              {book.status === "read" ? "Read" : "Want to Read"}
            </Box>
            {book.recommend && (
              <Box px={2.5} py={1} borderRadius="5px" fontFamily={MONO} fontSize="8px"
                letterSpacing="0.15em" textTransform="uppercase"
                bg="rgba(244,132,95,0.1)" color="#f4845f"
                border="1px solid rgba(244,132,95,0.3)">
                Recommended
              </Box>
            )}
          </HStack>

          {book.rating > 0 && <Box mb={4}><StarRating value={book.rating} readOnly /></Box>}

          {book.dateFinished && (
            <Text fontFamily={MONO} fontSize="9px" color={monoColor} mb={3} letterSpacing="0.1em">
              Finished: {new Date(book.dateFinished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </Text>
          )}

          {book.note && (
            <Box bg={fieldBg} border="1px solid" borderColor={fieldBdr}
              borderRadius="10px" p={3} mb={4}
              borderLeft="2px solid" borderLeftColor="#7c3aed">
              <Text fontFamily={B} fontSize="13px" color={subColor} fontStyle="italic">
                {book.note}
              </Text>
            </Box>
          )}

          <Box h="1px" bg={fieldBdr} my={4} />

          <VStack spacing={2} align="stretch">
            {[
              ["🔍 Google Reviews", () => openGoogleReviews(book.title, book.author)],
              ["📗 Find on Goodreads", () => openGoodreads(book.title)],
            ].map(([label, fn]) => (
              <Box key={label} as="button" onClick={fn}
                fontFamily={MONO} fontSize="9px" letterSpacing="0.15em" textTransform="uppercase"
                px={4} py={2.5} borderRadius="8px" border="1px solid" borderColor={fieldBdr}
                color={subColor} cursor="pointer" textAlign="center"
                _hover={{ borderColor: "#7c3aed", color: "#7c3aed", bg: "rgba(124,58,237,0.06)" }}
                transition="all 0.2s">{label}</Box>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor={hdrBdr} gap={3} justifyContent="space-between">
          <Box as="button" onClick={() => { onDelete(book.id); onClose(); }}
            fontFamily={MONO} fontSize="8px" letterSpacing="0.15em" textTransform="uppercase"
            px={4} py={2} borderRadius="8px" border="1px solid rgba(239,68,68,0.3)"
            color="rgba(239,68,68,0.7)" cursor="pointer"
            _hover={{ bg: "rgba(239,68,68,0.08)", color: "#ef4444" }} transition="all 0.2s">
            Delete
          </Box>
          <HStack spacing={2}>
            <Box as="button" onClick={onClose}
              fontFamily={MONO} fontSize="8px" letterSpacing="0.15em" textTransform="uppercase"
              px={4} py={2} borderRadius="8px" border="1px solid" borderColor={fieldBdr}
              color={subColor} cursor="pointer" _hover={{ borderColor: "#7c3aed" }} transition="all 0.2s">
              Close
            </Box>
            <Box as="button" onClick={() => { onClose(); onEdit(book); }}
              fontFamily={MONO} fontSize="8px" letterSpacing="0.15em" textTransform="uppercase"
              px={4} py={2} borderRadius="8px"
              bg="rgba(124,58,237,0.12)" border="1px solid rgba(124,58,237,0.4)" color="#7c3aed"
              cursor="pointer" _hover={{ bg: "rgba(124,58,237,0.2)" }} transition="all 0.2s">
              Edit
            </Box>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Goal modal (restyled) ────────────────────────────────────────────────────
function GoalModal({ isOpen, onClose, goal, onSave }) {
  const [target, setTarget] = useState(goal.target);
  useEffect(() => { setTarget(goal.target); }, [goal]);

  const modalBg  = useColorModeValue("rgba(248,248,250,0.97)", "rgba(8,8,8,0.97)");
  const modalBdr = useColorModeValue("rgba(0,0,0,0.09)",       "rgba(255,255,255,0.08)");
  const hdrBdr   = useColorModeValue("rgba(0,0,0,0.07)",       "rgba(255,255,255,0.06)");
  const subColor = useColorModeValue("gray.500",               "whiteAlpha.400");
  const inputSx  = {
    fontFamily: MONO, fontSize: "13px", borderRadius: "10px",
    borderColor: useColorModeValue("rgba(0,0,0,0.12)", "rgba(255,255,255,0.08)"),
    _focus: { borderColor: "#7c3aed", boxShadow: "0 0 0 1px #7c3aed" },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay bg="rgba(0,0,0,0.72)" backdropFilter="blur(14px)" />
      <ModalContent bg={modalBg} border="1px solid" borderColor={modalBdr}
        borderRadius="16px" mx={4} overflow="hidden">
        <Box h="2px" bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)" />
        <ModalHeader borderBottom="1px solid" borderColor={hdrBdr} pb={4} pt={5}>
          <HStack spacing={3}>
            <Box w="16px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily={H} fontSize="12px" letterSpacing="0.05em">Set Reading Goal</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={subColor} borderRadius="8px" />
        <ModalBody py={5}>
          <FormControl>
            <FormLabel fontFamily={MONO} fontSize="8px" letterSpacing="0.2em"
              textTransform="uppercase" color={subColor}>
              Books to read in {goal.year}
            </FormLabel>
            <NumberInput value={target} onChange={(_, v) => setTarget(v)} min={1} max={365}>
              <NumberInputField {...inputSx} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter borderTop="1px solid" borderColor={hdrBdr} gap={3}>
          <Box as="button" onClick={onClose}
            fontFamily={MONO} fontSize="8px" letterSpacing="0.15em" textTransform="uppercase"
            px={4} py={2} borderRadius="8px" border="1px solid" borderColor={hdrBdr}
            color={subColor} cursor="pointer" transition="all 0.2s">Cancel</Box>
          <Box as="button" onClick={() => { onSave(target); onClose(); }}
            fontFamily={MONO} fontSize="8px" letterSpacing="0.15em" textTransform="uppercase"
            px={5} py={2} borderRadius="8px"
            bg="rgba(124,58,237,0.12)" border="1px solid rgba(124,58,237,0.4)" color="#7c3aed"
            cursor="pointer" _hover={{ bg: "rgba(124,58,237,0.2)" }} transition="all 0.2s">
            Save Goal
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BookNook() {
  const [books, setBooks]           = useState([]);
  const [goal, setGoal]             = useState(DEFAULT_GOAL);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBook, setEditBook]     = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);

  const addDrawer   = useDisclosure();
  const detailModal = useDisclosure();
  const goalModal   = useDisclosure();
  const toast       = useToast();

  // localStorage (untouched)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { const { books: b, goal: g } = JSON.parse(raw); if (b) setBooks(b); if (g) setGoal(g); }
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify({ books, goal })); }, [books, goal]);

  const handleSaveBook = useCallback((book) => {
    setBooks((prev) => {
      const idx = prev.findIndex((b) => b.id === book.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = book; return next; }
      return [...prev, book];
    });
    toast({ title: editBook ? "Book updated!" : "Book added to shelf!", status: "success", duration: 2000, isClosable: true });
    setEditBook(null);
  }, [editBook, toast]);

  const handleDeleteBook = useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast({ title: "Book removed", status: "info", duration: 2000 });
  }, [toast]);

  const handleSpineClick = (book) => { setSelectedBook(book); detailModal.onOpen(); };
  const handleEditFromModal = (book) => { setEditBook(book); addDrawer.onOpen(); };
  const openAdd = () => { setEditBook(null); addDrawer.onOpen(); };

  const filterBooks = (statusFilter) => {
    let filtered = statusFilter === "recommended"
      ? books.filter((b) => b.recommend)
      : books.filter((b) => b.status === statusFilter);
    if (genreFilter) filtered = filtered.filter((b) => b.genre === genreFilter);
    return filtered;
  };

  // Tokens
  const outerBg  = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
  const outerBdr = useColorModeValue("rgba(0,0,0,0.08)",       "rgba(255,255,255,0.06)");
  const subColor = useColorModeValue("gray.400",               "whiteAlpha.350");
  const tabColor = useColorModeValue("gray.400",               "whiteAlpha.400");
  const tabSel   = useColorModeValue("gray.700",               "rgba(255,255,255,0.88)");
  const GRAD     = "linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)";

  return (
    <Box
      bg={outerBg} backdropFilter="blur(10px)"
      border="1px solid" borderColor={outerBdr}
      borderRadius="20px" p={{ base: 5, md: 8 }}
      maxW="1100px" mx="auto" position="relative" overflow="hidden"
    >
      {/* Top hairline */}
      <Box position="absolute" top={0} left="8%" right="8%" h="1px"
        background="linear-gradient(to right, transparent, rgba(124,58,237,0.35), transparent)" />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <Flex justify="space-between" align="flex-start" mb={8} flexWrap="wrap" gap={4}>
        <Box>
          <HStack spacing={3} mb={3}>
            <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily={MONO} fontSize="9px" letterSpacing="0.3em"
              textTransform="uppercase" color={subColor}>Reading life</Text>
          </HStack>
          <Text fontFamily={H} fontSize={{ base: "26px", md: "40px" }}
            fontWeight="900" letterSpacing="-0.02em" lineHeight={1.05}
            display="inline-block" w="fit-content"
            style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Book
          </Text>
          <Text fontFamily={H} fontSize={{ base: "26px", md: "40px" }}
            fontWeight="900" letterSpacing="-0.02em" lineHeight={1.05}
            color="text.subdued">
            Nook
          </Text>
        </Box>

        {/* Add button */}
        <Box as="button" onClick={openAdd}
          fontFamily={MONO} fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
          px={5} py={3} borderRadius="10px"
          bg="rgba(124,58,237,0.1)" border="1px solid rgba(124,58,237,0.35)" color="#7c3aed"
          cursor="pointer" alignSelf="center"
          _hover={{ bg: "rgba(124,58,237,0.18)", transform: "translateY(-1px)" }}
          transition="all 0.2s">
          + Add Book
        </Box>
      </Flex>

      {/* Goal banner */}
      <YearlyGoalBanner books={books} goal={goal} onEditGoal={goalModal.onOpen} />

      {/* Genre filter */}
      <GenreFilter selected={genreFilter} onChange={setGenreFilter} />

      {/* Tabs — styled to match other components */}
      <Tabs variant="unstyled">
        <TabList mb={6} gap={6} borderBottom="1px solid" borderColor={outerBdr} pb={3}>
          {[
            `Read (${books.filter(b => b.status === "read").length})`,
            `Want to Read (${books.filter(b => b.status === "want-to-read").length})`,
            `Recommended (${books.filter(b => b.recommend).length})`,
          ].map((label) => (
            <Tab key={label}
              fontFamily={MONO} fontSize="9px" letterSpacing="0.2em" textTransform="uppercase"
              color={tabColor} pb={3} px={0} position="relative" transition="color 0.18s"
              _selected={{ color: tabSel }}
              sx={{
                '&[aria-selected=true]::after': {
                  content: '""', position: 'absolute', bottom: '-12px', left: 0, right: 0,
                  height: '2px', background: GRAD,
                }
              }}>
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel px={0} pt={0}>
            <Shelf books={filterBooks("read")} onBookClick={handleSpineClick} />
          </TabPanel>
          <TabPanel px={0} pt={0}>
            <Shelf books={filterBooks("want-to-read")} onBookClick={handleSpineClick} />
          </TabPanel>
          <TabPanel px={0} pt={0}>
            <Shelf
              books={books.filter(b => b.recommend && (!genreFilter || b.genre === genreFilter))}
              onBookClick={handleSpineClick} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {books.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Box as="button" onClick={openAdd}
            fontFamily={MONO} fontSize="9px" letterSpacing="0.15em" textTransform="uppercase"
            color="#7c3aed" cursor="pointer"
            _hover={{ textDecoration: "underline" }}>
            Add your first book to fill the shelf →
          </Box>
        </Box>
      )}

      {/* Drawers & Modals */}
      <AddBookDrawer isOpen={addDrawer.isOpen}
        onClose={() => { addDrawer.onClose(); setEditBook(null); }}
        onSave={handleSaveBook} editBook={editBook} />
      <BookDetailModal book={selectedBook} isOpen={detailModal.isOpen}
        onClose={detailModal.onClose} onEdit={handleEditFromModal} onDelete={handleDeleteBook} />
      <GoalModal isOpen={goalModal.isOpen} onClose={goalModal.onClose}
        goal={goal} onSave={(t) => setGoal((g) => ({ ...g, target: t }))} />
    </Box>
  );
}


// TODO: change the vibe to fit the vibe of the portfolio project
// TODO: Make a distinction btw admin - me and everyone else no one but me can edit the content
// TODO: MAke the editability thing for all the other stuff too
// TODO: Add a tooltip on themetoggle and commandpalette to show shortcuts
// TODO: Make the Hobbies sections editable, on click opens this on the same page, just below

