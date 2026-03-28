import { useState, useEffect, useCallback } from "react";
import {
  Box, Flex, Text, VStack, HStack, Button, IconButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseButton,
  FormControl, FormLabel, Input, Select, Textarea, Switch,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Badge, Progress, Tabs, TabList, Tab, TabPanels, TabPanel,
  useDisclosure, useColorModeValue, Tooltip, Wrap, WrapItem,
  Stat, StatLabel, StatNumber, StatHelpText,
  Grid, GridItem, Divider, useToast,
} from "@chakra-ui/react";

// ─── Constants ────────────────────────────────────────────────────────────────

const GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
  "Biography", "History", "Self-Help", "Science",
  "Philosophy", "Poetry", "Thriller", "Romance",
  "Graphic Novel", "Other",
];

const GENRE_COLORS = {
  "Fiction": "#7C9885",
  "Non-Fiction": "#8B7355",
  "Science Fiction": "#5B7FA6",
  "Fantasy": "#9B72CF",
  "Biography": "#C4956A",
  "History": "#A67C52",
  "Self-Help": "#6BAE8E",
  "Science": "#5B9BAE",
  "Philosophy": "#7B8EA6",
  "Poetry": "#C4789B",
  "Thriller": "#8B4C4C",
  "Romance": "#C47878",
  "Graphic Novel": "#78A8C4",
  "Other": "#8A8A8A",
};

const SPINE_COLORS = [
  "#C4714A", "#4A7FA6", "#5A9E6F", "#9B6B4A",
  "#7A5FA6", "#C49A4A", "#4A8A8A", "#C45A7A",
  "#6A8A4A", "#4A5A9E", "#A64A6A", "#4A9E8A",
];

const STORAGE_KEY = "book-nook-data";

const DEFAULT_GOAL = { year: new Date().getFullYear(), target: 24 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 10);

const getPaceMessage = (booksRead, target) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);
  const elapsed = (now - start) / (end - start);
  const expectedByNow = Math.floor(target * elapsed);
  const diff = booksRead - expectedByNow;
  if (diff > 1) return { msg: `${diff} books ahead of pace 🔥`, color: "green.400" };
  if (diff < -1) return { msg: `${Math.abs(diff)} books behind pace 📖`, color: "orange.400" };
  return { msg: "Right on pace ✨", color: "blue.400" };
};

const openGoogleReviews = (title, author) => {
  window.open(
    `https://www.google.com/search?q=${encodeURIComponent(title + " " + author + " book review")}`,
    "_blank"
  );
};

const openGoodreads = (title) => {
  window.open(
    `https://www.goodreads.com/search?q=${encodeURIComponent(title)}`,
    "_blank"
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ value = 0, onChange, readOnly = false }) {
  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          as={readOnly ? "span" : "button"}
          onClick={() => !readOnly && onChange(star)}
          fontSize="20px"
          cursor={readOnly ? "default" : "pointer"}
          opacity={star <= value ? 1 : 0.25}
          _hover={!readOnly ? { transform: "scale(1.2)" } : {}}
          transition="all 0.15s"
        >
          ★
        </Box>
      ))}
    </HStack>
  );
}

function BookSpine({ book, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tooltip label={`${book.title} — ${book.author}`} placement="top" hasArrow>
      <Box
        w="36px"
        h="220px"
        bg={book.color}
        borderRadius="3px 6px 6px 3px"
        cursor="pointer"
        position="relative"
        onClick={() => onClick(book)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        transform={hovered ? "translateY(-8px) scale(1.04)" : "translateY(0) scale(1)"}
        transition="all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)"
        boxShadow={
          hovered
            ? "4px 0 16px rgba(0,0,0,0.35), inset -2px 0 4px rgba(255,255,255,0.15)"
            : "2px 0 8px rgba(0,0,0,0.25), inset -2px 0 4px rgba(255,255,255,0.1)"
        }
        flexShrink={0}
        _before={{
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          borderRadius: "3px 0 0 3px",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        {/* Spine text */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%) rotate(-90deg)"
          width="200px"
          textAlign="center"
          pointerEvents="none"
        >
          <Text
            fontSize="11px"
            fontWeight="700"
            color="rgba(255,255,255,0.95)"
            letterSpacing="0.05em"
            textTransform="uppercase"
            noOfLines={1}
            textShadow="0 1px 2px rgba(0,0,0,0.4)"
          >
            {book.title}
          </Text>
          <Text
            fontSize="8px"
            color="rgba(255,255,255,0.7)"
            letterSpacing="0.03em"
            noOfLines={1}
            mt="1px"
          >
            {book.author}
          </Text>
        </Box>

        {/* Top binding detail */}
        <Box
          position="absolute"
          top="8px"
          left="4px"
          right="4px"
          height="3px"
          bg="rgba(255,255,255,0.2)"
          borderRadius="1px"
        />
        <Box
          position="absolute"
          bottom="8px"
          left="4px"
          right="4px"
          height="3px"
          bg="rgba(255,255,255,0.2)"
          borderRadius="1px"
        />
      </Box>
    </Tooltip>
  );
}

function EmptyShelfMessage({ label }) {
  return (
    <Box textAlign="center" py={12} opacity={0.5}>
      <Text fontSize="40px" mb={2}>📚</Text>
      <Text fontSize="sm" fontStyle="italic" color="inherit">{label}</Text>
    </Box>
  );
}

function Shelf({ books, onBookClick }) {
  const woodTop = useColorModeValue("#C4A882", "#8B6E4E");
  const woodSide = useColorModeValue("#A68B5B", "#6B4E2A");
  const woodShelf = useColorModeValue("#D4B896", "#9B7A52");
  const shelfBg = useColorModeValue("rgba(139,100,60,0.08)", "rgba(80,50,20,0.3)");

  return (
    <Box
      position="relative"
      bg={shelfBg}
      borderRadius="8px"
      p={4}
      pb={0}
      minH="280px"
    >
      {/* Back wall texture */}
      <Box
        position="absolute"
        inset={0}
        borderRadius="8px"
        bgImage={`repeating-linear-gradient(
          90deg,
          transparent,
          transparent 60px,
          rgba(139,100,60,0.06) 60px,
          rgba(139,100,60,0.06) 61px
        )`}
        pointerEvents="none"
      />

      {/* Books area */}
      <Box
        position="relative"
        minH="220px"
        px={2}
      >
        {books.length === 0 ? (
          <EmptyShelfMessage label="No books here yet. Add your first one!" />
        ) : (
          <Flex
            align="flex-end"
            gap="6px"
            flexWrap="wrap"
            minH="220px"
            pt={4}
          >
            {books.map((book) => (
              <BookSpine key={book.id} book={book} onClick={onBookClick} />
            ))}
          </Flex>
        )}
      </Box>

      {/* Shelf plank */}
      <Box
        h="18px"
        bg={woodTop}
        borderRadius="3px"
        mt={1}
        boxShadow={`0 4px 0 ${woodSide}, 0 8px 16px rgba(0,0,0,0.25)`}
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "3px",
          background: `linear-gradient(180deg, ${woodShelf} 0%, ${woodTop} 40%, rgba(0,0,0,0.1) 100%)`,
        }}
      />
    </Box>
  );
}

function YearlyGoalBanner({ books, goal, onEditGoal }) {
  const booksRead = books.filter((b) => b.status === "read").length;
  const pct = Math.min(100, Math.round((booksRead / goal.target) * 100));
  const pace = getPaceMessage(booksRead, goal.target);
  const bgGradient = useColorModeValue(
    "linear(to-r, orange.50, amber.50)",
    "linear(to-r, orange.900, yellow.900)"
  );

  return (
    <Box
      bgGradient={bgGradient}
      border="1px solid"
      borderColor={useColorModeValue("orange.200", "orange.700")}
      borderRadius="xl"
      p={5}
      mb={6}
    >
      <Flex justify="space-between" align="flex-start" mb={3} wrap="wrap" gap={2}>
        <Box>
          <Text fontFamily="'Georgia', serif" fontSize="lg" fontWeight="700">
            {goal.year} Reading Goal
          </Text>
          <Text fontSize="sm" color={pace.color} fontWeight="600" mt={0.5}>
            {pace.msg}
          </Text>
        </Box>
        <HStack>
          <Stat textAlign="right">
            <StatNumber fontSize="2xl" fontFamily="'Georgia', serif">
              {booksRead}
              <Text as="span" fontSize="lg" color="gray.500"> / {goal.target}</Text>
            </StatNumber>
            <StatLabel fontSize="xs">books read</StatLabel>
          </Stat>
          <Button size="xs" variant="ghost" onClick={onEditGoal} colorScheme="orange">
            Edit goal
          </Button>
        </HStack>
      </Flex>
      <Progress
        value={pct}
        colorScheme="orange"
        borderRadius="full"
        size="sm"
        bg={useColorModeValue("orange.100", "orange.900")}
      />
      <Text fontSize="xs" mt={1} color="gray.500" textAlign="right">{pct}% complete</Text>
    </Box>
  );
}

function GenreFilter({ selected, onChange }) {
  return (
    <Wrap spacing={2} mb={4}>
      <WrapItem>
        <Badge
          px={3}
          py={1}
          borderRadius="full"
          cursor="pointer"
          colorScheme={selected === null ? "orange" : "gray"}
          onClick={() => onChange(null)}
          fontSize="xs"
          variant={selected === null ? "solid" : "outline"}
        >
          All
        </Badge>
      </WrapItem>
      {GENRES.map((g) => (
        <WrapItem key={g}>
          <Badge
            px={3}
            py={1}
            borderRadius="full"
            cursor="pointer"
            colorScheme={selected === g ? "orange" : "gray"}
            onClick={() => onChange(g === selected ? null : g)}
            fontSize="xs"
            variant={selected === g ? "solid" : "outline"}
          >
            {g}
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  );
}

// ─── Add/Edit Drawer ──────────────────────────────────────────────────────────

function AddBookDrawer({ isOpen, onClose, onSave, editBook }) {
  const toast = useToast();
  const blank = {
    title: "", author: "", genre: GENRES[0],
    status: "read", color: SPINE_COLORS[0],
    recommend: false, dateFinished: "", rating: 0, note: "",
  };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    setForm(editBook ? { ...blank, ...editBook } : blank);
  }, [editBook, isOpen]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.author.trim()) {
      toast({ title: "Title and author are required", status: "warning", duration: 2000 });
      return;
    }
    onSave({
      ...form,
      id: editBook?.id || uid(),
      dateAdded: editBook?.dateAdded || new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontFamily="'Georgia', serif" borderBottomWidth="1px">
          {editBook ? "Edit Book" : "Add a Book"}
        </DrawerHeader>

        <DrawerBody py={6}>
          <VStack spacing={5} align="stretch">
            <FormControl isRequired>
              <FormLabel fontSize="sm">Title</FormLabel>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. The Name of the Wind" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm">Author</FormLabel>
              <Input value={form.author} onChange={(e) => set("author", e.target.value)}
                placeholder="e.g. Patrick Rothfuss" />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Genre</FormLabel>
              <Select value={form.genre} onChange={(e) => set("genre", e.target.value)}>
                {GENRES.map((g) => <option key={g}>{g}</option>)}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Status</FormLabel>
              <HStack>
                {["read", "want-to-read"].map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={form.status === s ? "solid" : "outline"}
                    colorScheme="orange"
                    onClick={() => set("status", s)}
                  >
                    {s === "read" ? "✅ Read" : "🔖 Want to Read"}
                  </Button>
                ))}
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Spine Color</FormLabel>
              <HStack flexWrap="wrap" gap={2}>
                {SPINE_COLORS.map((c) => (
                  <Box
                    key={c}
                    w="28px" h="28px"
                    bg={c}
                    borderRadius="6px"
                    cursor="pointer"
                    border={form.color === c ? "3px solid" : "3px solid transparent"}
                    borderColor={form.color === c ? "orange.400" : "transparent"}
                    onClick={() => set("color", c)}
                    _hover={{ transform: "scale(1.15)" }}
                    transition="all 0.15s"
                  />
                ))}
                <Input
                  type="color"
                  w="28px"
                  h="28px"
                  p={0}
                  border="none"
                  cursor="pointer"
                  borderRadius="6px"
                  value={form.color}
                  onChange={(e) => set("color", e.target.value)}
                  title="Custom color"
                />
              </HStack>
            </FormControl>

            {form.status === "read" && (
              <>
                <FormControl>
                  <FormLabel fontSize="sm">Date Finished</FormLabel>
                  <Input
                    type="date"
                    value={form.dateFinished}
                    onChange={(e) => set("dateFinished", e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Rating</FormLabel>
                  <StarRating value={form.rating} onChange={(v) => set("rating", v)} />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Recommend?</FormLabel>
                  <Switch
                    isChecked={form.recommend}
                    onChange={(e) => set("recommend", e.target.checked)}
                    colorScheme="orange"
                  />
                </FormControl>
              </>
            )}

            <FormControl>
              <FormLabel fontSize="sm">Notes / Teaser</FormLabel>
              <Textarea
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
                placeholder="A quick thought about this book..."
                rows={3}
                resize="none"
              />
            </FormControl>
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" gap={3}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="orange" onClick={handleSubmit}>
            {editBook ? "Save Changes" : "Add to Shelf"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// ─── Book Detail Modal ────────────────────────────────────────────────────────

function BookDetailModal({ book, isOpen, onClose, onEdit, onDelete }) {
  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="xl" overflow="hidden">
        {/* Colored header band */}
        <Box h="6px" bg={book.color} />
        <ModalHeader pt={5} fontFamily="'Georgia', serif">
          {book.title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Text fontSize="sm" color="gray.500" mb={3}>by {book.author}</Text>

          <HStack mb={4} flexWrap="wrap" gap={2}>
            <Badge
              px={3}
              py={1}
              borderRadius="full"
              bg={GENRE_COLORS[book.genre] || "#8A8A8A"}
              color="white"
              fontSize="xs"
            >
              {book.genre}
            </Badge>
            <Badge
              colorScheme={book.status === "read" ? "green" : "blue"}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
            >
              {book.status === "read" ? "✅ Read" : "🔖 Want to Read"}
            </Badge>
            {book.recommend && (
              <Badge colorScheme="orange" borderRadius="full" px={3} py={1} fontSize="xs">
                👍 Recommended
              </Badge>
            )}
          </HStack>

          {book.rating > 0 && (
            <Box mb={3}>
              <StarRating value={book.rating} readOnly />
            </Box>
          )}

          {book.dateFinished && (
            <Text fontSize="xs" color="gray.500" mb={3}>
              Finished: {new Date(book.dateFinished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </Text>
          )}

          {book.note && (
            <Box
              bg={useColorModeValue("gray.50", "gray.700")}
              borderRadius="md"
              p={3}
              mb={4}
              borderLeft="3px solid"
              borderLeftColor="orange.300"
            >
              <Text fontSize="sm" fontStyle="italic">{book.note}</Text>
            </Box>
          )}

          <Divider mb={4} />

          <VStack spacing={2} align="stretch">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Text>🔍</Text>}
              onClick={() => openGoogleReviews(book.title, book.author)}
            >
              Google Reviews
            </Button>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Text>📗</Text>}
              onClick={() => openGoodreads(book.title)}
            >
              Find on Goodreads
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" gap={3} justifyContent="space-between">
          <Button
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => { onDelete(book.id); onClose(); }}
          >
            Delete
          </Button>
          <HStack>
            <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
            <Button size="sm" colorScheme="orange" onClick={() => { onClose(); onEdit(book); }}>
              Edit
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Goal Edit Modal ──────────────────────────────────────────────────────────

function GoalModal({ isOpen, onClose, goal, onSave }) {
  const [target, setTarget] = useState(goal.target);

  useEffect(() => { setTarget(goal.target); }, [goal]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader fontFamily="'Georgia', serif">Set Reading Goal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="sm">Books to read in {goal.year}</FormLabel>
            <NumberInput
              value={target}
              onChange={(_, v) => setTarget(v)}
              min={1}
              max={365}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="orange" onClick={() => { onSave(target); onClose(); }}>
            Save Goal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookNook() {
  const [books, setBooks] = useState([]);
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);

  const addDrawer = useDisclosure();
  const detailModal = useDisclosure();
  const goalModal = useDisclosure();
  const toast = useToast();

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { books: b, goal: g } = JSON.parse(raw);
        if (b) setBooks(b);
        if (g) setGoal(g);
      }
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ books, goal }));
  }, [books, goal]);

  const handleSaveBook = useCallback((book) => {
    setBooks((prev) => {
      const idx = prev.findIndex((b) => b.id === book.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = book;
        return next;
      }
      return [...prev, book];
    });
    toast({
      title: editBook ? "Book updated!" : "Book added to shelf!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setEditBook(null);
  }, [editBook, toast]);

  const handleDeleteBook = useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast({ title: "Book removed", status: "info", duration: 2000 });
  }, [toast]);

  const handleSpineClick = (book) => {
    setSelectedBook(book);
    detailModal.onOpen();
  };

  const handleEditFromModal = (book) => {
    setEditBook(book);
    addDrawer.onOpen();
  };

  const openAdd = () => {
    setEditBook(null);
    addDrawer.onOpen();
  };

  const filterBooks = (statusFilter) => {
    let filtered = books.filter((b) => b.status === statusFilter);
    if (statusFilter === "recommended") {
      filtered = books.filter((b) => b.recommend);
    }
    if (genreFilter) filtered = filtered.filter((b) => b.genre === genreFilter);
    return filtered;
  };

  const bg = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      bg={bg}
      borderRadius="2xl"
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      p={{ base: 4, md: 8 }}
      maxW="900px"
      mx="auto"
      fontFamily="system-ui, sans-serif"
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Text
            fontFamily="'Georgia', serif"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="700"
            color={headingColor}
            letterSpacing="-0.02em"
          >
            📚 Book Nook
          </Text>
          <Text fontSize="sm" color="gray.500" mt={0.5}>
            My reading life, shelved.
          </Text>
        </Box>
        <Button
          colorScheme="orange"
          size="md"
          borderRadius="full"
          leftIcon={<Text fontSize="md">＋</Text>}
          onClick={openAdd}
          fontWeight="700"
        >
          Add Book
        </Button>
      </Flex>

      {/* Goal Banner */}
      <YearlyGoalBanner
        books={books}
        goal={goal}
        onEditGoal={goalModal.onOpen}
      />

      {/* Genre Filter */}
      <GenreFilter selected={genreFilter} onChange={setGenreFilter} />

      {/* Tabs */}
      <Tabs colorScheme="orange" variant="soft-rounded">
        <TabList mb={4} gap={2} flexWrap="wrap">
          <Tab fontSize="sm" fontWeight="600">✅ Read ({books.filter(b => b.status === "read").length})</Tab>
          <Tab fontSize="sm" fontWeight="600">🔖 Want to Read ({books.filter(b => b.status === "want-to-read").length})</Tab>
          <Tab fontSize="sm" fontWeight="600">👍 Recommended ({books.filter(b => b.recommend).length})</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <Shelf
              books={filterBooks("read")}
              onBookClick={handleSpineClick}
            />
          </TabPanel>
          <TabPanel px={0}>
            <Shelf
              books={filterBooks("want-to-read")}
              onBookClick={handleSpineClick}
            />
          </TabPanel>
          <TabPanel px={0}>
            <Shelf
              books={books.filter(b => b.recommend && (!genreFilter || b.genre === genreFilter))}
              onBookClick={handleSpineClick}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Empty state CTA */}
      {books.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="link"
            colorScheme="orange"
            fontSize="sm"
            onClick={openAdd}
          >
            Add your first book to fill the shelf →
          </Button>
        </Box>
      )}

      {/* Drawers & Modals */}
      <AddBookDrawer
        isOpen={addDrawer.isOpen}
        onClose={() => { addDrawer.onClose(); setEditBook(null); }}
        onSave={handleSaveBook}
        editBook={editBook}
      />

      <BookDetailModal
        book={selectedBook}
        isOpen={detailModal.isOpen}
        onClose={detailModal.onClose}
        onEdit={handleEditFromModal}
        onDelete={handleDeleteBook}
      />

      <GoalModal
        isOpen={goalModal.isOpen}
        onClose={goalModal.onClose}
        goal={goal}
        onSave={(t) => setGoal((g) => ({ ...g, target: t }))}
      />
    </Box>
  );
}

// TODO: change the vibe to fit the vibe of the portfolio project
// TODO: Make a distinction btw admin - me and everyone else no one but me can edit the content
// TODO: MAke the editability thing for all the other stuff too
// TODO: Add a tooltip on themetoggle and commandpalette to show shortcuts